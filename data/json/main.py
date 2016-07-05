#! /usr/bin/python

import regina
import json
import ast
import math

cs = open('cappelshanesonedgelink.js','w')
ss = open('s2s1vertexlink.js','w')
l = open('l83vertexlink.js','w')


tri = regina.Dim2Triangulation().fromIsoSig('uvLLvLvAALQegjponqtsstaaaaaaaaaaa')
visa = regina.WebVisual(tri, pow(10,-10))
j = visa.jsonSphere()
j = "var json = " + j
cs.write(j)

tri = regina.Dim2Triangulation().fromIsoSig('yvLvvvQvAAzPPekonrqpsuwvxxaaaaaaaaaaaaa')
visa = regina.WebVisual(tri, pow(10,-10))
j = visa.jsonSphere()
j = "var json = " + j
ss.write(j)

tri = regina.Dim2Triangulation().fromIsoSig('ivLPPefghhaaaaa')
visa = regina.WebVisual(tri, pow(10,-10))
j = visa.jsonSphere()
j = "var json = " + j
l.write(j)

