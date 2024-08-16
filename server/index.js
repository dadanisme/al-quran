// Add Express
const express = require("express");

// Initialize Express
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

// Add CORS
app.use(cors());

const jsonParser = bodyParser.json();

// Create GET request
app.get("/", (req, res) => {
  res.send("Express on Vercel");
});

app.post("/", jsonParser, async (req, res) => {
  const { data } = req.body;

  const audioName = `${new Date().getTime()}.wav`;
  // data is base64 encoded of audio file
  // convert it to File
  const buff = Buffer.from(data, "base64");
  const file = new File([buff], audioName, { type: "audio/wav" });

  var myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    "sk_bf38daae3695cbb8ed2c320b2cb275178c6ecbfc4c8b3f6cff1584bba4164d73"
  );

  var formdata = new FormData();
  formdata.append("files", file);
  formdata.append(
    "config",
    '{"file_transcription":{"mode":"advanced","language_id":"ar"},"sentiment_detect":false}'
  );

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  const response = await fetch(
    "https://voice.neuralspace.ai/api/v1/jobs",
    requestOptions
  );
  const resData = await response.json();

  res.send(resData);
});

// Initialize server
app.listen(5000, () => {
  console.log("Running on port 5000.");
});

// Export the Express API
module.exports = app;
