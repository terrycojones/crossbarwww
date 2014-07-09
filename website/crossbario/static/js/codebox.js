var when = autobahn.when;
var codeRequests = [];
var vm = new ViewModel();

function ViewModel() {

   var self = this;

   self.demos = [

      { category: "pubsub", title: "PubSub" , examples:
         [
            { example: "basic", title: "Basic",
               frontend: [
                  {
                     language: "javascript",
                     url: "/static/files/examples/pubsub/basic/frontend.js",
                     gitHubUrl: "https://github.com/tavendo/AutobahnPython/tree/master/examples/twisted/wamp/basic/pubsub/basic/frontend.js"
                  },
                  {
                     language: "python",
                     url: "/static/files/examples/pubsub/basic/frontend.py",
                     gitHubUrl: "https://github.com/tavendo/AutobahnPython/tree/master/examples/twisted/wamp/basic/pubsub/basic/frontend.py"
                  }
               ],
               backend: [
                  {
                     language: "javascript",
                     url: "/static/files/examples/pubsub/basic/backend.js",
                     gitHubUrl: "https://github.com/tavendo/AutobahnPython/tree/master/examples/twisted/wamp/basic/pubsub/basic/backend.js"
                  },
                  {
                     language: "python",
                     url: "/static/files/examples/pubsub/basic/backend.py",
                     gitHubUrl: "https://github.com/tavendo/AutobahnPython/tree/master/examples/twisted/wamp/basic/pubsub/basic/backend.py"
                  }
               ]
            },
            { example: "complex", title: "Complex",
               frontend: [
                  {
                     language: "javascript",
                     url: "/static/files/examples/pubsub/complex/frontend.js",
                     gitHubUrl: "https://github.com/tavendo/AutobahnPython/tree/master/examples/twisted/wamp/basic/pubsub/complex/frontend.js"
                  },
                  {
                     language: "python",
                     url: "/static/files/examples/pubsub/complex/frontend.py",
                     gitHubUrl: "https://github.com/tavendo/AutobahnPython/tree/master/examples/twisted/wamp/basic/pubsub/complex/frontend.py"
                  }
               ],
               backend: [
                  {
                     language: "javascript",
                     url: "/static/files/examples/pubsub/complex/backend.js",
                     gitHubUrl: "https://github.com/tavendo/AutobahnPython/tree/master/examples/twisted/wamp/basic/pubsub/complex/backend.js"
                  },
                  {
                     language: "python",
                     url: "/static/files/examples/pubsub/complex/backend.py",
                     gitHubUrl: "https://github.com/tavendo/AutobahnPython/tree/master/examples/twisted/wamp/basic/pubsub/complex/backend.py"
                  }
               ]
            },
            { example: "options", title: "Options",
               frontend: [
                  {
                     language: "javascript",
                     url: "/static/files/examples/pubsub/options/frontend.js",
                     gitHubUrl: "https://github.com/tavendo/AutobahnPython/tree/master/examples/twisted/wamp/basic/pubsub/options/frontend.js"
                  },
                  {
                     language: "python",
                     url: "/static/files/examples/pubsub/options/frontend.py",
                     gitHubUrl: "https://github.com/tavendo/AutobahnPython/tree/master/examples/twisted/wamp/basic/pubsub/options/frontend.py"
                  }
               ],
               backend: [
                  {
                     language: "javascript",
                     url: "/static/files/examples/pubsub/options/backend.js",
                     gitHubUrl: "https://github.com/tavendo/AutobahnPython/tree/master/examples/twisted/wamp/basic/pubsub/options/backend.js"
                  },
                  {
                     language: "python",
                     url: "/static/files/examples/pubsub/options/backend.py",
                     gitHubUrl: "https://github.com/tavendo/AutobahnPython/tree/master/examples/twisted/wamp/basic/pubsub/options/backend.py"
                  }
               ]
            },
            { example: "unsubscribe", title: "Unsubscribe",
               frontend: [
                  {
                     language: "javascript",
                     url: "/static/files/examples/pubsub/unsubscribe/frontend.js",
                     gitHubUrl: "https://github.com/tavendo/AutobahnPython/tree/master/examples/twisted/wamp/basic/pubsub/unsubscribe/frontend.js"
                  },
                  {
                     language: "python",
                     url: "/static/files/examples/pubsub/unsubscribe/frontend.py",
                     gitHubUrl: "https://github.com/tavendo/AutobahnPython/tree/master/examples/twisted/wamp/basic/pubsub/unsubscribe/frontend.py"
                  }
               ],
               backend: [
                  {
                     language: "javascript",
                     url: "/static/files/examples/pubsub/unsubscribe/backend.js",
                     gitHubUrl: "https://github.com/tavendo/AutobahnPython/tree/master/examples/twisted/wamp/basic/pubsub/unsubscribe/backend.js"
                  },
                  {
                     language: "python",
                     url: "/static/files/examples/pubsub/unsubscribe/backend.py",
                     gitHubUrl: "https://github.com/tavendo/AutobahnPython/tree/master/examples/twisted/wamp/basic/pubsub/unsubscribe/backend.py"
                  }
               ]
            }
         ]
      },

      { category: "rpc", title: "RPC ", examples:
         [
            { example: "timeservice", title: "Time Service",
               frontend: [
                  {
                     language: "javascript",
                     url: "/static/files/examples/rpc/timeservice/frontend.js",
                    gitHubUrl: "https://github.com/tavendo/AutobahnPython/tree/master/examples/twisted/wamp/basic/rpc/timeservice/frontend.js"
                  },
                  {
                     language: "python",
                     url: "/static/files/examples/rpc/timeservice/frontend.py",
                     gitHubUrl: "https://github.com/tavendo/AutobahnPython/tree/master/examples/twisted/wamp/basic/rpc/timeservice/frontend.py"
                  }
               ],
               backend: [
                  {
                     language: "javascript",
                     url: "/static/files/examples/rpc/timeservice/backend.js",
                     gitHubUrl: "https://github.com/tavendo/AutobahnPython/tree/master/examples/twisted/wamp/basic/rpc/timeservice/backend.js"
                  },
                  {
                     language: "python",
                     url: "/static/files/examples/rpc/timeservice/backend.py",
                     gitHubUrl: "https://github.com/tavendo/AutobahnPython/tree/master/examples/twisted/wamp/basic/rpc/timeservice/backend.py"
                  }
               ]
            },
            { example: "slowsquare", title: "Slow Square",
               frontend: [
                  {
                     language: "javascript",
                     url: "/static/files/examples/rpc/slowsquare/frontend.js",
                     gitHubUrl: "https://github.com/tavendo/AutobahnPython/tree/master/examples/twisted/wamp/basic/rpc/slowsquare/frontend.js"
                  },
                  {
                     language: "python",
                     url: "/static/files/examples/rpc/slowsquare/frontend.py",
                     gitHubUrl: "https://github.com/tavendo/AutobahnPython/tree/master/examples/twisted/wamp/basic/rpc/slowsquare/frontend.py"
                  }
               ],
               backend: [
                  {
                     language: "javascript",
                     url: "/static/files/examples/rpc/slowsquare/backend.js",
                     gitHubUrl: "https://github.com/tavendo/AutobahnPython/tree/master/examples/twisted/wamp/basic/rpc/slowsquare/backend.js"
                  },
                  {
                     language: "python",
                     url: "/static/files/examples/rpc/slowsquare/backend.py",
                     gitHubUrl: "https://github.com/tavendo/AutobahnPython/tree/master/examples/twisted/wamp/basic/rpc/slowsquare/backend.py"
                  }
               ]
            },
            { example: "arguments", title: "Arguments",
               frontend: [
                  {
                     language: "javascript",
                     url: "/static/files/examples/rpc/arguments/frontend.js",
                     gitHubUrl: "https://github.com/tavendo/AutobahnPython/tree/master/examples/twisted/wamp/basic/rpc/arguments/frontend.js"
                  },
                  {
                     language: "python",
                     url: "/static/files/examples/rpc/arguments/frontend.py",
                     gitHubUrl: "https://github.com/tavendo/AutobahnPython/tree/master/examples/twisted/wamp/basic/rpc/arguments/frontend.py"
                  }
               ],
               backend: [
                  {
                     language: "javascript",
                     url: "/static/files/examples/rpc/arguments/backend.js",
                     gitHubUrl: "https://github.com/tavendo/AutobahnPython/tree/master/examples/twisted/wamp/basic/rpc/arguments/backend.js"
                  },
                  {
                     language: "python",
                     url: "/static/files/examples/rpc/arguments/backend.py",
                     gitHubUrl: "https://github.com/tavendo/AutobahnPython/tree/master/examples/twisted/wamp/basic/rpc/arguments/backend.py"
                  }
               ]
            },
            { example: "complex", title: "Complex Result",
               frontend: [
                  {
                     language: "javascript",
                     url: "/static/files/examples/rpc/complex/frontend.js",
                     gitHubUrl: "https://github.com/tavendo/AutobahnPython/tree/master/examples/twisted/wamp/basic/rpc/complex/frontend.js"
                  },
                  {
                     language: "python",
                     url: "/static/files/examples/rpc/complex/frontend.py",
                     gitHubUrl: "https://github.com/tavendo/AutobahnPython/tree/master/examples/twisted/wamp/basic/rpc/complex/frontend.py"
                  }
               ],
               backend: [
                  {
                     language: "javascript",
                     url: "/static/files/examples/rpc/complex/backend.js",
                     gitHubUrl: "https://github.com/tavendo/AutobahnPython/tree/master/examples/twisted/wamp/basic/rpc/complex/backend.js"
                  },
                  {
                     language: "python",
                     url: "/static/files/examples/rpc/complex/backend.py",
                     gitHubUrl: "https://github.com/tavendo/AutobahnPython/tree/master/examples/twisted/wamp/basic/rpc/complex/backend.py"
                  }
               ]
            },
            { example: "errors", title: "Errors",
               frontend: [
                  {
                     language: "javascript",
                     url: "/static/files/examples/rpc/errors/frontend.js",
                     gitHubUrl: "https://github.com/tavendo/AutobahnPython/tree/master/examples/twisted/wamp/basic/rpc/errors/frontend.js"
                  },
                  {
                     language: "python",
                     url: "/static/files/examples/rpc/errors/frontend.py",
                     gitHubUrl: "https://github.com/tavendo/AutobahnPython/tree/master/examples/twisted/wamp/basic/rpc/errors/frontend.py"
                  }
               ],
               backend: [
                  {
                     language: "javascript",
                     url: "/static/files/examples/rpc/errors/backend.js",
                     gitHubUrl: "https://github.com/tavendo/AutobahnPython/tree/master/examples/twisted/wamp/basic/rpc/errors/backend.js"
                  },
                  {
                     language: "python",
                     url: "/static/files/examples/rpc/errors/backend.py",
                     gitHubUrl: "https://github.com/tavendo/AutobahnPython/tree/master/examples/twisted/wamp/basic/rpc/errors/backend.py"
                  }
               ]
            },
            { example: "progress", title: "Progressive Results",
               frontend: [
                  {
                     language: "javascript",
                     url: "/static/files/examples/rpc/progress/frontend.js",
                     gitHubUrl: "https://github.com/tavendo/AutobahnPython/tree/master/examples/twisted/wamp/basic/rpc/progress/frontend.js"
                  },
                  {
                     language: "python",
                     url: "/static/files/examples/rpc/progress/frontend.py",
                     gitHubUrl: "https://github.com/tavendo/AutobahnPython/tree/master/examples/twisted/wamp/basic/rpc/progress/frontend.py"
                  }
               ],
               backend: [
                  {
                     language: "javascript",
                     url: "/static/files/examples/rpc/progress/backend.js",
                     gitHubUrl: "https://github.com/tavendo/AutobahnPython/tree/master/examples/twisted/wamp/basic/rpc/progress/backend.js"
                  },
                  {
                     language: "python",
                     url: "/static/files/examples/rpc/progress/backend.py",
                     gitHubUrl: "https://github.com/tavendo/AutobahnPython/tree/master/examples/twisted/wamp/basic/rpc/progress/backend.py"
                  }
               ]
            },
            { example: "options", title: "Options",
               frontend: [
                  {
                     language: "javascript",
                     url: "/static/files/examples/rpc/options/frontend.js",
                     gitHubUrl: "https://github.com/tavendo/AutobahnPython/tree/master/examples/twisted/wamp/basic/rpc/options/frontend.js"
                  },
                  {
                     language: "python",
                     url: "/static/files/examples/rpc/options/frontend.py",
                     gitHubUrl: "https://github.com/tavendo/AutobahnPython/tree/master/examples/twisted/wamp/basic/rpc/options/frontend.py"
                  }
               ],
               backend: [
                  {
                     language: "javascript",
                     url: "/static/files/examples/rpc/options/backend.js",
                     gitHubUrl: "https://github.com/tavendo/AutobahnPython/tree/master/examples/twisted/wamp/basic/rpc/options/backend.js"
                  },
                  {
                     language: "python",
                     url: "/static/files/examples/rpc/options/backend.py",
                     gitHubUrl: "https://github.com/tavendo/AutobahnPython/tree/master/examples/twisted/wamp/basic/rpc/options/backend.py"
                  }
               ]
            }
         ]
      }
   ];
   self.defaultExample = { category: "pubsub", example: "basic", frontendLanguage: "javascript", backendLanguage: "python" };


   self.languageToTitle = { javascript: "Javascript", python: "Python" };
   self.languageToBrush = { javascript: "js", python: "python", text: "plain" }; // for the SyntaxHighlighter brushes

   // create the array for the switchBar
   self.switches = [];
   self.demos.forEach ( function ( el, i, arr ) {

      self.switches[i] = {};
      var curr = self.switches[i];
      curr.title = el.title;
      curr.category = el.category;
      curr.examples = [];

      el.examples.forEach ( function ( ex, p, r ) {

         curr.examples[p] = {};
         curr.examples[p].title = ex.title;
         curr.examples[p].example = ex.example;
      })

   });

   // create the examples object
   //
   // structure is:
   //
   //    self.examples = {
   //       category: {
   //          example: {
   //             frontend: {
   //                language: { url: "...", gitHubUrl: "..." }
   //             },
   //             backend: {
   //                language: { url: "...", gitHubUrl: "..." }
   //             },
   //          }
   //       }
   //    };

   self.examples = {};
   self.codeUrls = [];
   // loop over the categories
   self.demos.forEach(function(cat) {

      var category = self.examples[cat.category] = {};

      // loop over the examples
      cat.examples.forEach(function(ex) {

         var examples = category[ex.example] = {
            frontend: {},
            backend: {},
         };

         var components = ["frontend", "backend"];
         components.forEach (function (component) {

            ex[component].forEach (function (lang) {

               examples[component][lang.language] = {
                  url: lang.url,
                  gitHubUrl: lang.gitHubUrl,
                  code: "Code not loaded yet. \n Please try again in a couple of seconds."
               };

               self.codeUrls.push ({
                  category: cat.category,
                  example: ex.example,
                  component: [component],
                  language: lang.language,
                  url: lang.url
               });

            })
         })

      })
   })

   self.fillLanguageBar = function ( cat, ex, component ) {

      var example = self.examples[cat][ex],
          comp = component + "Languages",
          arr = example[component];

      // clear present content of the bar
      self.currentExample[comp]([]);

      // fill the observable array for the component
      for(lang in arr) {
         console.log("l", lang);
         self.currentExample[comp].push(lang);
      }

   }


   // observables containing the what should currently be displayed
   var de = self.defaultExample;
   self.currentExample = {
         category: ko.observable(de.category),
         example: ko.observable(de.example),
         frontendLanguage: ko.observable(de.frontendLanguage),
         backendLanguage: ko.observable(de.backendLanguage),
         frontendLanguages: ko.observableArray(["javascript"]),
         backendLanguages: ko.observableArray(["python"]),
         link: ko.observable(self.examples[de.category][de.example].link)
      };

   self.singleBoxComponent = ko.observable("frontend");

   // subscriptions to trigger changing displayed code on example / language change

   self.currentExample.frontendLanguage.subscribe(function(newLang) {
      self.changeLanguage("frontend", newLang);
   });

   self.currentExample.backendLanguage.subscribe(function(newLang) {
      self.changeLanguage("backend", newLang);
   });

   self.currentExample.example.subscribe(function(newEx) {
      self.changeExample(newEx);
   });



   self.noCodeAvailable = "In this example, there is no code for \n \n            (language) \n \nPlease select an available language!"

   self.changeExample = function (newEx) {

      var curEx = self.currentExample,
          exs = self.examples;

      self.fillLanguageBar ( curEx.category(), newEx, "frontend");
      self.fillLanguageBar ( curEx.category(), newEx, "backend");

      self.currentExample.link(exs[curEx.category()][newEx].link);

      // check whether the currently selected languages are available for the new Example
      if ( exs[curEx.category()][newEx].frontend[curEx.frontendLanguage()] ) {

         var frontendCode = exs[curEx.category()][newEx].frontend[curEx.frontendLanguage()].code;
         self.replaceCode ( "frontend", curEx.frontendLanguage(), frontendCode );


      } else {

         console.log("language not available for this example - frontend");

         var noCodeAvailable = self.noCodeAvailable.replace("(language)", self.languageToTitle[curEx.frontendLanguage()]);

         self.replaceCode ( "frontend", "text", noCodeAvailable );

      }

      if ( exs[curEx.category()][newEx].backend[curEx.backendLanguage()] ) {

         var backendCode = exs[curEx.category()][newEx].backend[curEx.backendLanguage()].code;
         self.replaceCode ( "backend", curEx.backendLanguage(), backendCode );

      } else {

         console.log("language not available for this example - backend");

         var noCodeAvailable = self.noCodeAvailable.replace("(language)", self.languageToTitle[curEx.backendLanguage()]);

         self.replaceCode ( "backend", "text", noCodeAvailable );

      }

   };

   self.changeLanguage = function (component, newLang) {

      console.log ("changeLanguage", component, newLang);

      var curEx = self.currentExample,
          exs = self.examples,
          code = exs [curEx.category()] [curEx.example()] [component] [newLang].code;

      self.replaceCode (component, newLang, code);

   };

   self.syntaxContainer = {};
   self.syntaxContainer.frontend = document.getElementsByClassName("frontendSyntaxContainer");
   self.syntaxContainer.backend = document.getElementsByClassName("backendSyntaxContainer");

   self.replaceCode = function ( component, language, code ) {

      // take out pyhton copyright header
      // - evil hack, FIXME
      if (language === "python") {
         var lines = code.split("\n");
         // exclude the placeholder string when code not loaded yet
         if ( lines.length > 17 ) {
            lines.splice(0, 17); // all our python files have 17 lines of copyright header
            code = lines.join("\n");
         }
      }

      // construct a pre element containing the code, with the correct brush
      var pre = document.createElement("pre");

      pre.setAttribute("class", "brush: " + self.languageToBrush[language]);
      pre.innerHTML = code;

      // clone element and attach to both syntaxContainers
      // self.syntaxContainer[component].forEach(function(cont) {  // nope, this is a node list which doesn't have this method!
      var syntaxContainer = self.syntaxContainer[component];
      for ( var i = 0; i < syntaxContainer.length; i++ ) {

         var cont = syntaxContainer[i],
             codeNode = pre.cloneNode(true);

         cont.innerHTML = "";
         cont.appendChild(codeNode);

         SyntaxHighlighter.highlight(codeNode);

      };

   };

   self.codeRequests = [];
   self.startCodeDownload = function () {

      self.codeUrls.forEach( function (el) {

         var url = el.url,
             id = {
               category: el.category,
               example: el.example,
               component: el.component,
               language: el.language
             },
             req = getCode(url, id)

         self.codeRequests.push(req);

      });

      when.all(self.codeRequests).then(self.storeCode, function() { console.log("error", arguments);});
   }

   self.storeCode = function (arr) {

      arr.forEach (function (el) {

         var id = el[0],
             rawCode = el[1],
             code = rawCode.replace("<", "&lt;").replace(">", "&gt");

         self.examples[id.category][id.example][id.component][id.language].code = code;

      })

   }

   // set up the initial display of the default example

   self.initialCodeRequests = [];
   var de = self.defaultExample;

   self.initialCodeRequests.push(getCode(self.examples[de.category][de.example].frontend[de.frontendLanguage].url, { language: de.frontendLanguage, component: "frontend" }));
   self.initialCodeRequests.push(getCode(self.examples[de.category][de.example].backend[de.backendLanguage].url, { language: de.backendLanguage, component: "backend" }));

   self.fillLanguageBar (de.category, de.example, "frontend");
   self.fillLanguageBar (de.category, de.example, "backend");

   self.fillInitialCode = function (arr) {

      // start the requests for all the code
      self.startCodeDownload ();

      // for both frontend + backend code:
      var frontend = arr[0][0],
          backend = arr[1][0],
          frontendCode = arr[0][1].replace("<", "&lt;").replace(">", "&gt"),
          backendCode = arr[1][1].replace("<", "&lt;").replace(">", "&gt");

      self.replaceCode ( frontend.component, frontend.language, frontendCode );

      self.replaceCode ( backend.component, backend.language, backendCode );

   }

   when.all(self.initialCodeRequests).then(self.fillInitialCode, function(err) { console.log("error on initial code request", err)});


}

ko.applyBindings(vm);


// XMLHttpRequests as promises

function getCode (url, id) {

   var d = autobahn.when.defer();
   var req = new XMLHttpRequest();

   req.onreadystatechange = function (evt) {

      if (req.readyState === 4) {

         if (req.status === 200) {

            d.resolve([id, req.response]);

         } else if (req.status === 204) {

            d.resolve();

         } else {

            d.reject(req.status, req.statusText);

         }

      }
   }

   req.open("GET", url, true);

   req.send();

   return d.promise;

};
