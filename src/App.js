import React, { Component } from "react";
// import logo from './logo.svg';
import "./App.css";
import Particles from "react-particles-js";
import { Upload, Icon, message } from "antd";

const { Dragger } = Upload;
const props = {
  name: "file",
  multiple: true,
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  }
};
class App extends Component {
  render() {
    return (
      <div className="App">
        <Particles
          params={{
            particles: {
              number: {
                value: 50
              },
              size: {
                value: 3
              }
            },
            interactivity: {
              events: {
                onhover: {
                  enable: true,
                  mode: "repulse"
                }
              }
            }
          }}
        />
        <div className="container ">
          <div className="col-md-12 dragContainer">
            <h1 className="text-center text-white">Audio Translator</h1>
            <Dragger {...props}>
              <p className="ant-upload-drag-icon">
                <Icon type="inbox" />
              </p>
              <p className="ant-upload-text">
                Click or drag audio file to translate
              </p>
              <p className="ant-upload-hint">
                {/* Support for a single or bulk upload. Strictly prohibit from
                uploading company data or other band files */}
              </p>
            </Dragger>
          </div>
          <div className="col-md-12">
            <h2 className="text-center text-white mT30">
              Choose your language
            </h2>
          </div>
        </div>
        <div className="container d-flex mT30">
          <div class="flags col">
            <img
              id="target_de"
              class="clickableimage"
              src="https://s3.amazonaws.com/tomash-us-east-1/voice-translator/graphics/flags/de.png"
              height="100"
            />
            <br />
            German
            <br />
            &nbsp;
          </div>
          <div class="flags col ">
            <img
              id="target_es"
              class="clickableimage"
              src="https://s3.amazonaws.com/tomash-us-east-1/voice-translator/graphics/flags/es.png"
              height="100"
            />
            <br />
            Spanish
          </div>
          <div class="flags col">
            <img
              id="target_fr"
              class="clickableimage"
              src="https://s3.amazonaws.com/tomash-us-east-1/voice-translator/graphics/flags/fr.png"
              height="100"
            />
            <br />
            French
            <br />
            &nbsp;
          </div>
          <div class="flags col">
            <img
              id="target_it"
              class="clickableimage"
              src="https://s3.amazonaws.com/tomash-us-east-1/voice-translator/graphics/flags/it.png"
              height="100"
            />
            <br />
            Italian
            <br />
            &nbsp;
          </div>
          <div class="flags col">
            <img
              id="target_sv"
              class="clickableimage"
              src="https://s3.amazonaws.com/tomash-us-east-1/voice-translator/graphics/flags/sv.png"
              height="100"
            />
            <br />
            Swedish
            <br />
            &nbsp;
          </div>
        </div>
      </div>
    );
  }
}

export default App;
