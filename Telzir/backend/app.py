from flask import Flask, render_template, request, jsonify
import telzir

app = Flask(__name__)

@app.route("/")
def main():
    return render_template('index.html')


@app.route("/calculate", methods=["POST"])
def calculate():
    try:
        data = request.json
        orig = data['DDD1']
        dest = data['DDD2']
        plan = data['plan']
        faleMais = data['faleMais']
        time = data['time']
        if(faleMais):
            value = telzir.fale_mais(orig, dest, int(plan), int(time))
            return jsonify({"value":value})
        else:
            value = telzir.normal_price(orig, dest, int(time))
            return jsonify({"value":value})
    except Exception as error:
        return jsonify({"error": error })


if __name__ == "__main__":
    app.run(host="0.0.0.0")