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
      name: 'Mohamed Taher Amara',
      value: 'mohamed taher amara'
    },
    {
      id: 4,
      name: 'Sami',
      value: 'sami'
    },

    {
      id: 5,
      name: 'DJ Panda',
      value: 'panda'
    },
    {
      id: 6,
      name: 'Majdi',
      value: 'majdi'
    },
    {
      id: 7,
      name: 'Réseaux Sociaux (Facebook, Instagram, TikTok...)',
      value: 'social network'
    }
  ]

  const [loading, setIsLoading] = useState(false)
  const [added, setAdded] = useState(false)

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  var result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  var charactersLength = characters.length;

  const onSubmit = async data => {
    setIsLoading(true)

    var timestamp = new Date().getUTCMilliseconds();

    for (var i = 0; i < 12; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    let reservationCode = result + timestamp
    // console.log(orderCode)

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
  };

  return (
    <div className="App">
      <header className="App-header">

        {
          added ?
            <div>
              <span>Nous traitons votre réservation, vérifiez votre courrier électronique pour la confirmation du réservation
                et attendez notre téléphone.
              </span>
            </div>
            :
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <input
                  {...register("fullName", { required: 'Veuillez entrer votre Nom et Prénom.' })}
                  placeholder='Nom et Prénom'
                />

                {errors.fullName && <span>{errors.fullName.message}</span>}
              </div>

              <div>
                <input
                  {...register("email", {
                    required: 'Veuillez entrer votre E-mail.',
                    pattern: {
                      value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                      message: 'Veuillez entrer un email valide.'
                    }
                  })}
                  placeholder='E-mail'
                />

                {errors.email && <span>{errors.email.message}</span>}
              </div>

              <div>
                <input
                  {...register("phone", {
                    required: 'Veuillez entrer votre numéro de téléphone.',
                    pattern: {
                      value: /(2|5|9|)\d{8}/,
                      message: 'Veuillez entrer un numéro de téléphone valide.'
                    }
                  })}
                  placeholder='Numéro de téléphone'
                />

                {errors.phone && <span>{errors.phone.message}</span>}
              </div>

              <div>
                <select {...register("broughtBy")}>
                  {persons.map(p => {
                    return (
                      <option value={p.value} key={p.id}>{p.name}</option>
                    )
                  })}
                </select>
              </div>
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
                  <input type="submit" value="Envoyer" />
              }
            </form>
        }
      </header>
    </div>
  );
}

export default App;
