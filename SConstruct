###############################################################################
##
##  Copyright (C) 2012-2014 Tavendo GmbH
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

SVG_FILES = [
   'crossbar_icon.svg',
   'crossbar_icon_and_text.svg',
   'crossbar_icon_and_text_vectorized.svg',
   'crossbar_text_vectorized.svg',

   'github.svg',
   'github_highlighted.svg',
   'github_path.svg',
   'github_path_highlighted.svg',

   'crossbar_components.svg',
   'crossbar_hiw_architecture.svg',
   'crossbar_hiw_call_stored_procedure.svg',
   'crossbar_hiw_client_to_client_pubsub.svg',
   'crossbar_hiw_publish_from_database.svg',
   'wamp_grey.svg',

   'NY-404.svg',
   'hiw_sa_01.svg',
   'hiw_pubsub.svg',
   'hiw_rpc.svg',
   'hiw_webapp.svg',
   'hiw_sa_instant.svg',
   'hiw_sa_line.svg',
   'hiw_sa_sensor.svg',

   'link_external.svg',
   'homepage_cross_diagram.svg',

   'blacktocat.svg',

   'rpc_register.svg',
   'rpc_call.svg',
   'pubsub_subscribe.svg',
   'pubsub_publish.svg'
]

IMG_SOURCE_DIR = "design"
IMG_GEN_DIR    = "website/crossbario/static/img/gen"

###
### Do not touch below this unless you know what you are doing;)
###

import os
import pkg_resources

taschenmesser = pkg_resources.resource_filename('taschenmesser', '..')

## use this for Taschenmesser development only
#taschenmesser = "../../infrequent/taschenmesser"

env = Environment(tools = ['default', 'taschenmesser'],
                  toolpath = [taschenmesser],
                  ENV  = os.environ)

## build optimized SVGs, PNGs and gzipped versions of the former
## inside IMG_GEN_DIR
##
for svg in SVG_FILES:
   svgOpt = env.Scour("%s/%s" % (IMG_GEN_DIR, svg),
                      "%s/%s" % (IMG_SOURCE_DIR, svg),
                      SCOUR_OPTIONS = {'enable_viewboxing': True})
   env.GZip("%s.gz" % svgOpt[0], svgOpt)

   png = env.Svg2Png("%s.png" % os.path.splitext(str(svgOpt[0]))[0], svgOpt, SVG2PNG_OPTIONS = {})
   env.GZip("%s.gz" % png[0], png)
