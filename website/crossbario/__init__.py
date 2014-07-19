###############################################################################
##
##  Copyright 2013 Tavendo GmbH
##
##  Licensed under the Apache License, Version 2.0 (the "License");
##  you may not use this file except in compliance with the License.
##  You may obtain a copy of the License at
##
##      http://www.apache.org/licenses/LICENSE-2.0
##
##  Unless required by applicable law or agreed to in writing, software
##  distributed under the License is distributed on an "AS IS" BASIS,
##  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
##  See the License for the specific language governing permissions and
##  limitations under the License.
##
###############################################################################

import uuid
import os

import mimetypes

mimetypes.add_type('image/svg+xml', '.svg')
mimetypes.add_type('text/javascript', '.jgz')


from optparse import OptionParser

from flask import Flask, Request, request, session, g, url_for, \
     abort, render_template, flash


app = Flask(__name__)
app.secret_key = str(uuid.uuid4())


## generate Pygments CSS file for style:
## pygmentize -S default -f html > pygments.css
##

import mistune
from pygments import highlight
from pygments.lexers import get_lexer_by_name
from pygments.formatters import HtmlFormatter
import json

import re
import copy

class MyInlineGrammar(mistune.InlineGrammar):
    # it would take a while for creating the right regex
    wiki_link = re.compile(
        r'\[\['                   # [[
        r'([\s\S]+?\|[\s\S]+?)'   # Page 2|Page 2
        r'\]\](?!\])'             # ]]
    )

    wiki_short_link = re.compile(
        r'\[\['                   # [[
        r'([\s\S]+?)'             # Page 2
        r'\]\](?!\])'             # ]]
    )


class MyInlineLexer(mistune.InlineLexer):
    default_features = copy.copy(mistune.InlineLexer.default_features)

    # Add wiki_link parser to default features
    # you can insert it any place you like
    default_features.insert(3, 'wiki_link')
    default_features.insert(3, 'wiki_short_link')

    def __init__(self, renderer, rules=None, **kwargs):
        if rules is None:
            # use the inline grammar
            rules = MyInlineGrammar()

        super(MyInlineLexer, self).__init__(renderer, rules, **kwargs)

    def output_wiki_link(self, m):
        text = m.group(1)
        alt, link = text.split('|')
        # you can create an custom render
        # you can also return the html if you like
        return self.renderer.wiki_link(alt, link)

    def output_wiki_short_link(self, m):
        text = m.group(1)
        alt, link = text, text
        # you can create an custom render
        # you can also return the html if you like
        return self.renderer.wiki_link(alt, link)


class DocPageRenderer(mistune.Renderer):

   def __init__(self, pages, debug = False):
      mistune.Renderer.__init__(self)
      self.debug = debug
      self._pages = pages
      self._prefix = None

   def wiki_link(self, alt, link):
      if self._prefix:
         return '<a href="{}/{}">{}</a>'.format(self._prefix, link.replace(' ', '-'), alt)
      else:
         return '<a href="{}">{}</a>'.format(link.replace(' ', '-'), alt)

   def block_code(self, code, lang):
      if self.debug:
         print "CODE", lang, len(code)

      lexer = None
      if lang:
         try:
            lexer = get_lexer_by_name(lang, stripall = True)
         except:
            print("failed to load lexer for language '{}'".format(lang))

      if not lexer:
         return "\n<pre><code>{}</code></pre>\n".format(mistune.escape(code))

      formatter = HtmlFormatter()
      return highlight(code, lexer, formatter)

   def autolink(self, link, is_email = False):
      if self.debug:
         print "autolink", link
      return mistune.Renderer.autolink(self, link, is_email)

   def codespan(self, text):
      if self.debug:
         print "codespan", text
      return mistune.Renderer.codespan(self, text)

   def link(self, link, title, content):
      if not (link.startswith('http') or link.startswith('/') or link.startswith('#')):
         if self._prefix:
            link = "{}/{}/".format(self._prefix, link.replace(' ', '-'))
         else:
            link = "{}/".format(link.replace(' ', '-'))

      if self.debug:
         print "link", link, title, content
      return mistune.Renderer.link(self, link, title, content)


class DocPages:
   def __init__(self, docroot, extensions = ['.md'], debug = False):
      rend = DocPageRenderer(self, debug)
      inline = MyInlineLexer(rend)
      self._renderer = mistune.Markdown(renderer = rend, inline = inline)
      self._pages = {}
      self.debug = debug

      total = 0
      errors = 0

      for dirpath, dirnames, filenames in os.walk(docroot):
         for f in filenames:
            base, ext = os.path.splitext(f)
            if ext in extensions:
               total += 1
               fp = os.path.join(dirpath, f)
               with open(fp, 'r') as fd:
                  source = fd.read()
                  try:
                     if self.debug:
                        print "\nprocessing {}".format(fp)
                     if base == 'Home':
                        rend._prefix = None
                     else:
                        rend._prefix = '..'
                     contents = self._renderer(source)
                  except Exception as e:
                     print "warning: failed to process {}: {}".format(fp, e)
                     errors += 1
                  else:
                     path = base
                     self._pages[base] = contents
      print("processed {} files: {} ok, {} error".format(total, len(self._pages), errors))

      #self._pages[None] = self._pages[index]

   def render(self, path):
      return self._pages.get(path, None)



pages = DocPages('../crossbar.wiki')



## load Sphinx documentation inventory
##
# from sphinx.ext.intersphinx import read_inventory_v2
# from posixpath import join

# f = open("./_build/html/objects.inv", "rb")
# f.readline()
# res = read_inventory_v2(f, "http://example.com", join)


@app.before_request
def before_request():
   session["widgeturl"] = app.widgeturl

@app.route('/')
def page_home():
   session['tab_selected'] = 'page_home'
   return render_template('index.html')

## generic template for all doc pages
##
@app.route('/docs/<path:path>/')
@app.route('/docs/')
def page_docs(path = None):
   session['tab_selected'] = 'page_docs'

   if path is None or path.strip() == "":
      title = 'Contents'
      path = 'Home'
   else:
      title = path.replace('-', ' ')

   contents = pages.render(path)
   if contents:
      return render_template('page_t_doc_page.html', contents = contents, title = title)
   else:
      return "no such page"

@app.route('/impressum/')
def page_impressum():
   session['tab_selected'] = 'page_impressum'
   return render_template('page_t_impressum.html')



if False:
   @app.route('/howitworks/')
   def page_howitworks():
      session['tab_selected'] = 'page_howitworks'
      return render_template('page_t_howitworks.html')

   @app.route('/gettingstarted/')
   def page_gettingstarted():
      session['tab_selected'] = 'page_gettingstarted'
      return render_template('page_t_gettingstarted.html')

   @app.route('/features/')
   def page_features():
      session['tab_selected'] = 'page_features'
      return render_template('page_t_features.html')

   @app.route('/roadmap/')
   def page_roadmap():
      session['tab_selected'] = 'page_roadmap'
      return render_template('page_t_roadmap.html')

   @app.route('/faq/')
   def page_faq():
      session['tab_selected'] = 'page_faq'
      return render_template('page_t_faq.html')

   @app.route('/reference/')
   def page_reference():
      session['tab_selected'] = 'page_reference'
      return render_template('page_t_reference.html')

   @app.route('/contribute/')
   def page_contribute():
      session['tab_selected'] = 'page_faq'
      return render_template('page_t_contribute.html')


if __name__ == "__main__":

   parser = OptionParser ()

   parser.add_option ("-d",
                      "--debug",
                      dest = "debug",
                      action = "store_true",
                      default = False,
                      help = "Enable debug mode for Flask")

   parser.add_option ("-f",
                      "--freeze",
                      dest = "freeze",
                      action = "store_true",
                      default = False,
                      help = "Freeze website using Frozen-Flask")

   parser.add_option ("-s",
                      "--socketserver",
                      dest = "socketserver",
                      action = "store_true",
                      default = False,
                      help = "Run Flask web app under standard Python SocketServer, instead of under Twisted")

   parser.add_option ("-p",
                      "--port",
                      dest = "port",
                      default = 8080,
                      help = "Listening port for Web server (i.e. 8090).")

   parser.add_option ("-w",
                      "--widgeturl",
                      dest = "widgeturl",
                      default = "https://demo.crossbar.io/clandeckwidget",
                      help = "WebClan widget base URL.")

   (options, args) = parser.parse_args ()

   app.widgeturl = str(options.widgeturl).strip()
   if len(app.widgeturl) == 0:
      app.widgeturl = None

   EXTRA_MIME_TYPES = {
      '.svg': 'image/svg+xml',
      '.jgz': 'text/javascript'
   }

   if options.freeze:

      from flask_frozen import Freezer
      freezer = Freezer(app)

      @freezer.register_generator
      def list_doc_pages():
         for p in pages._pages.keys():
            if not p.startswith('FAQ'):
               yield "/docs/{}/".format(p)
#            yield {'path': p}

      freezer.freeze()

      if options.debug:
         import sys, os
         from twisted.python import log
         log.startLogging(sys.stdout)

         from twisted.internet import reactor
         from twisted.web.server import Site
         from twisted.web.static import File

         resource = File(os.path.join(os.path.dirname(__file__), 'build'))
         resource.contentTypes.update(EXTRA_MIME_TYPES)
         site = Site(resource)
         reactor.listenTCP(int(options.port), site)
         reactor.run()

   else:
      if options.socketserver:
         print "Running Flask under standard Python SocketServer"
         app.run(host = "0.0.0.0", port = int(options.port), debug = options.debug)
      else:
         print "Running Flask under Twisted server"
         import sys
         from twisted.python import log
         from twisted.internet import reactor
         from twisted.web.server import Site
         from twisted.web.wsgi import WSGIResource

         app.debug = options.debug
         if options.debug:
            log.startLogging(sys.stdout)
         resource = WSGIResource(reactor, reactor.getThreadPool(), app)
         site = Site(resource)
         # FIXME (does not work)
         #site.contentTypes.update(EXTRA_MIME_TYPES)
         site.noisy = False
         site.log = lambda _: None

         reactor.listenTCP(int(options.port), site)
         reactor.run()
