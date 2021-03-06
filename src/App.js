import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import './App.css';
import { api } from './api/baseApi'
import Loader from "react-loader-spinner";

function App() {

  const persons = [
    {
      id: 1,
      name: 'Firas Karboul',
      value: 'firas karboul'
    },
    {
      id: 2,
      name: 'Selim Mahjoub',
      value: 'selim mahjoub'
    },
    {
      id: 3,
      name: 'Sam Feeling',
      value: 'sam feeling'
    },

    {
      id: 4,
      name: 'Yassine Yahbi',
      value: 'yassine yahbi'
    },
    {
      id: 5,
      name: 'Majdi Mouelhi',
      value: 'majdi Mouelhi'
    },
    {
      id: 6,
      name: 'Social Media',
      value: 'social media'
    }
  ]

  const [loading, setIsLoading] = useState(false)
  const [added, setAdded] = useState(false)
  const [filledSelect, setFilledSelect] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm();
  var result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  var charactersLength = characters.length;

  const onSubmit = async data => {
    if (data.broughtBy === "") {
      setFilledSelect(true)
    } else {
      setIsLoading(true)

      var ms = new Date().getUTCMilliseconds();
      var s = new Date().getSeconds();

      for (var i = 0; i < 5; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }

      let reservationCode = s + result + ms

      await api
        .post('/reservations', {
          "fullName": data.fullName,
          "email": data.email,
          "phoneNumber": data.phone,
          "broughtBy": data.broughtBy,
          "payment": false,
          "reservationCode": reservationCode
        })
        .then(res => {
          console.log(res.data)
          setIsLoading(false)
          setAdded(true)
        })
        .catch(e => {
          console.log(e)
        })
    }
  };

  return (
    <div className="App">
      <header className="App-header">

        {
          added ?
            <div>
              <span style={{ margin: 50, textAlign: 'center', alignItems: "center", justifyContent: 'center' }}>
                <p style={{ textAlign: 'center', margin: 50 }}>
                  Nous traitons votre r??servation, v??rifiez votre courrier ??lectronique pour la confirmation du r??servation.
                </p>
              </span>
            </div>
            :
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <p style={{
                  fontFamily: 'Monoton',
                  fontSize: 50,
                  color: '#ff7f50'
                }}>FALLING  LEAVES</p>

              </div>
              <div>
                <input
                  {...register("fullName", { required: 'Please enter your full name.' })}
                  placeholder='Full Name'
                  type="text"
                  className="formInput"
                />

              </div>
              {errors.fullName && <span style={{ fontSize: 15, color: '#e74c3c' }}>{errors.fullName.message}</span>}

              <div>
                <input
                  {...register("email", {
                    required: 'Please enter your email.',
                    pattern: {
                      value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                      message: 'Please enter a valid email.'
                    }
                  })}
                  placeholder='E-mail'
                  type="email"
                  className="formInput"
                />

              </div>
              {errors.email && <span style={{ fontSize: 15, color: '#e74c3c' }}>{errors.email.message}</span>}

              <div>
                <input
                  {...register("phone", {
                    required: 'Please enter your phone number.',
                    pattern: {
                      value: /(2|5|9|)\d{8}/,
                      message: 'Please enter a valid phone number.'
                    }
                  })}
                  placeholder='Phone Number'
                  type="tel"
                  className="formInput"
                />

              </div>
              {errors.phone && <span style={{ fontSize: 15, color: '#e74c3c' }}>{errors.phone.message}</span>}

              <div>
                <select {...register("broughtBy")} className="select">
                  <option value="" key="" style={{ color: "black" }}>How Did You Hear About Us?</option>
                  {persons.map(p => {
                    return (
                      <option value={p.value} key={p.id} style={{ color: "black" }}>{p.name}</option>
                    )
                  })}
                </select>
              </div>

              {filledSelect ? <span style={{ fontSize: 15, color: '#e74c3c' }}>Please, select how did you hear about us</span> : null}

              {
                loading ?
                  <div style={{ marginTop: 25 }}>
                    <Loader
                      type="Puff"
                      color="#00BFFF"
                      height={50}
                      width={50}
                    />
                  </div>
                  :
                  <div>
                    <input type="submit" value="BOOK NOW" className="buttonSubmit" />
                  </div>
              }
            </form>
        }
      </header>
    </div>
  );
}

export default App;
