#!/usr/bin/env python3
from flask import Flask, render_template
from os.path import abspath
from ctypes import CDLL, c_long as long

lib = CDLL(abspath('./libsum.so'))
lib.sum.argtypes = [long, long]
lib.sum.restype = long

app = Flask(__name__, template_folder="docs")

@app.route("/")
def index():
    a, b = 3, 5
    result = lib.sum(a, b)
    return render_template("index.html", result=result)

if __name__ == "__main__":
    app.run(debug=True)
