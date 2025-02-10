from flask import Flask, request, jsonify, render_template
from groq import Groq

app = Flask(__name__)

# ✅ Insert your Groq API Key here
GROQ_API_KEY = "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"  # ⚠️ Replace this with your real API key

# Initialize Groq API Client
client = Groq(api_key=GROQ_API_KEY)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/chat", methods=["POST"])
def chat():
    user_message = request.json.get("message")

    try:
        # ✅ Use a valid model
        chat_completion = client.chat.completions.create(
            messages=[{"role": "user", "content": user_message}],
            model="llama3-8b-8192",  # Use "llama3-70b" if needed
        )

        bot_response = chat_completion.choices[0].message.content

    except Exception as e:
        bot_response = f"Error: {str(e)}"

    return jsonify({"response": bot_response})

if __name__ == "__main__":
    app.run(debug=True)
