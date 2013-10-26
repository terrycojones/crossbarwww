###############################################################################
##
##  Copyright 2012-2013 Tavendo GmbH
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


import pkg_resources
taschenmesser = pkg_resources.resource_filename('taschenmesser', '..')
#taschenmesser = "../infrequent/taschenmesser"
env = Environment(tools = ['default', 'taschenmesser'], toolpath = [taschenmesser])


SVG_FILES = ['crossbar_hiw_architecture.svg',
             'crossbar_hiw_call_stored_procedure.svg']

#BUILDDIR = "website/crossbario/static/img"
BUILDDIR = "build"

for svg in SVG_FILES:
   svgOpt = env.Scour("%s/%s" % (BUILDDIR, svg),
                      "design/%s" % svg,
                      SCOUR_OPTIONS = {'enable_viewboxing': True})

   env.GZip("%s/%s.gz" % (BUILDDIR, svg), svgOpt)
