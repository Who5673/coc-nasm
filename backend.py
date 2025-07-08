#!/usr/bin/env python3
from flask import Flask, render_template

app = Flask(__name__, template_folder="docs")
result="Hello"

@app.route("/")
def index():
    return render_template("index.html", message=f"{result}")

if __name__ == "__main__":
    app.run(debug=True)
