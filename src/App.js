import React, { Component } from "react";
import Speech from "speak-tts";
import axios from "axios";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
// import logo from './logo.svg';
import "./App.css";
import Particles from "react-particles-js";
import india from "./Assets/tn_in-flag.gif";
import france from "./Assets/tn_fr-flag.gif";
import italy from "./Assets/tn_it-flag.gif";
import saudi from "./Assets/tn_sa-flag.gif";
import spain from "./Assets/tn_sp-flag.gif";

const speech = new Speech();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spanishTrans: "",
      hindiTrans: "",
      frenchTrans: "",
      italianTrans: "",
      arabicTrans: "",
      loader: false
    };
  }
  SpanishTrans() {
    speech.setLanguage("es-ES");
    speech
      .speak({
        text: this.state.spanishTrans
      })
      .then(() => {
        console.log("Success !");
      })
      .catch(e => {
        console.error("An error occurred :", e);
      });
  }
  HindiTrans() {
    speech.setLanguage("hi-IN");
    speech
      .speak({
        text: this.state.hindiTrans
      })
      .then(() => {
        console.log("Success !");
      })
      .catch(e => {
        console.error("An error occurred :", e);
      });
  }
  FrenchTrans() {
    speech.setLanguage("fr-FR");
    speech
      .speak({
        text: this.state.frenchTrans
      })
      .then(() => {
        console.log("Success !");
      })
      .catch(e => {
        console.error("An error occurred :", e);
      });
  }
  ItalianTrans() {
    speech.setLanguage("it-IT");
    speech
      .speak({
        text: this.state.italianTrans
      })
      .then(() => {
        console.log("Success !");
      })
      .catch(e => {
        console.error("An error occurred :", e);
      });
  }
  ArabicTrans() {
    console.log("bbbbbbbbbb", this.state.arabicTrans);
    speech.setLanguage("ar-SA");
    speech
      .speak({
        text: this.state.arabicTrans
      })
      .then(() => {
        console.log("Success !");
      })
      .catch(e => {
        console.error("An error occurred :", e);
      });
  }
  getUploadParams = ({ meta }) => {
    this.state.loader = true;
    const url = "https://httpbin.org/post";
    return {
      url: url,
      meta: { fileUrl: `${url}/${encodeURIComponent(meta.name)}` },
      type: "audio/wav"
    };
  };

  // called every time a file's `status` changes
  handleChangeStatus = ({ meta, file }, status) => {
    // this.setState({loader:true})

    if (status == "done") {
      const url =
        "http://cf088d8c.ngrok.io/api/translate/AUD-20200201-WA0002";
      console.log("fgfghfssssssss", file);
      axios
        .post(url, file, {
          headers: { "content-type": "audio/wav" }
        })
        .then(res => {
          console.log("fdgdgdgdf", res.data.translated.ar);
          this.state.loader = false;
          this.state.spanishTrans = res.data.translated.es;
          this.state.hindiTrans = res.data.translated.hi;
          this.state.frenchTrans = res.data.translated.fr;
          this.state.italianTrans = res.data.translated.la;
          this.state.arabicTrans = res.data.translated.ar;
        });
    }
    console.log(status, meta, file);
  };

  // receives array of files that are done uploading when submit button is clicked
  handleSubmit = (files, allFiles) => {
    console.log(files.map(f => f.meta));
    allFiles.forEach(f => f.remove());
  };

  render() {
    return (
      <div className="App">
        <div className="loaderWrapper">
          <Loader
            visible={this.state.loader}
            type="Audio"
            color="#00BFFF"
            height={100}
            width={100}
            className="loader"
          />
        </div>
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
            {/* <Dragger {...props}>
              <p className="ant-upload-drag-icon">
                <Icon type="inbox" />
              </p>
              <p className="ant-upload-text">
                Click or drag audio file to translate
              </p>
              <p className="ant-upload-hint">
               
              </p>
            </Dragger> */}
            <Dropzone
              getUploadParams={this.getUploadParams}
              onChangeStatus={this.handleChangeStatus}
              // onSubmit={this.handleSubmit}
              accept="image/*,audio/*,video/*"
            />
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
              src={india}
              height="100"
              onClick={this.HindiTrans.bind(this)}
            />
            <br />
            Hindi
            <br />
            &nbsp;
          </div>
          <div class="flags col ">
            <img
              id="target_es"
              class="clickableimage"
              src={spain}
              height="100"
              onClick={this.SpanishTrans.bind(this)}
            />
            <br />
            Spanish
          </div>
          <div class="flags col">
            <img
              id="target_fr"
              class="clickableimage"
              src={france}
              height="100"
              onClick={this.FrenchTrans.bind(this)}
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
              src={italy}
              height="100"
              onClick={this.ItalianTrans.bind(this)}
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
              src={saudi}
              height="100"
              onClick={this.ArabicTrans.bind(this)}
            />
            <br />
            Arabic
            <br />
            &nbsp;
          </div>
        </div>
      </div>
    );
  }
}

export default App;
