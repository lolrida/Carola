import logo from './logo.svg';
import './App.css';
import { useState, useSyncExternalStore } from 'react';

function App() {

  const [partita, setPartita] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inserimento, setInserimento] = useState(false);
  const [id, setId] = useState();
  const [risposta, setRisposta] = useState("");
  const [tentativi, setTentativi] = useState(0);
  const [numero, setNumero] = useState();
  const [input, setInput] = useState("");
  const [indovino, setIndovino] = useState(false);


  async function start(){
    setLoading(true)
    const response = await fetch('http://localhost:8080/partita', {method: "POST"});
    const answer = await response.json();
    setPartita(false);
    setId(answer.id);
    setNumero(answer.numero);
    setTentativi(0);
  }

  async function numeri(){
    setLoading(true)
    const response = await fetch('http://localhost:8080/partita/id', {method: "PUT"});
    const answer = await response.json();
    setLoading(false);
    setTentativi(answer.numero);
    setRisposta(answer.numero);
  }


    async function tentativo(){

      setTentativi(tentativi+1)
      
      if(input == numero){
        setIndovino(true);
      }
      
    }



  return (
    <div className ="App">
      <h1>INDOVINA NUMERO</h1>

      <div><button className="partita" onClick={(start)}>Nuova Partita</button> </div>
      
      {partita &&
   
        <div> In caricameno ...</div>
      }
      {!partita && 

      <div>
        <p>
          ID : {id}
        </p>
        <p>
          Tentativi : {tentativi}
        </p>
        <p>
          Numero : {numero}
        </p>

      </div>
        
        

      }
      <br></br>
      
      <br></br>
        <div className="input">
          <label>Inserisci un numero tra 1 e 100</label>
          <br></br>
          <input type="number" id="tentativo" min="1" max="100" value={input} onChange={(e) => setInput(e.target.value)}/>
          <button onClick={tentativo}>Invia</button>
          
        </div>

    </div>

      
  );
}



export default App;
