import React from "react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { deleteDeck, listDecks } from "../utils/api";

//the Home screen where it lists the existing decks
function Home() {
    const history = useHistory();
    const [decks, setDecks] = useState(null);
    
    useEffect(() => {
        async function loadDecks() {
            setDecks([]);
            try {
              const response = await listDecks()
              setDecks(response);
            } catch (error) {console.log(error)}
          }
      loadDecks();
    }, [])
  
    const handleCreateDeck = () => {
        history.push("/decks/new")
    }

    if(decks){
        return (
            <div>
                <button onClick={handleCreateDeck}>
                    <span className="oi oi-plus">
                        Create Deck
                    </span>
                </button>
                <ul>
                    {decks.map((deck) => (
                        <li key={deck.id}>
                            <h2>{deck.name}</h2>
                            <p>{deck.cards.length} cards</p>
                            <p>{deck.description}</p>
                            <button onClick={()=> {history.push(`/decks/${deck.id}`)}}>
                                <span className="oi oi-eye">
                                    View
                                </span> 
                            </button>
                            <button onClick={()=> {history.push(`/decks/${deck.id}/edit`)}}>
                                <span className="oi oi-pencil">
                                    Edit
                                </span>
                            </button>     
                            <button onClick={()=> {history.push(`/decks/${deck.id}/study`)}}>
                                <span className="oi oi-book">
                                    Study
                                </span>
                            </button>
                            <button 
                            onClick={() => {
                                if(window.confirm("Delete this deck?")){
                                    deleteDeck(`${deck.id}`);
                                    history.go("/")
                                }
                            }}> 
                                <span className="oi oi-trash" /> 
                            </button>
                        </li> 
                    ))}
                </ul>
            </div>
        )
    }
    return (
        <p>Loading...</p>
    );
}

export default Home;