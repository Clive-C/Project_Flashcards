import React from "react";
import { useEffect, useState } from "react";
import { deleteCard, deleteDeck, readDeck } from "../utils/api";
import { Link, useHistory, useParams } from "react-router-dom";


// component that loads the deck of cards
function Deck(){
    const params = useParams();
    const history = useHistory();

    const [currentDeck, setCurrentDeck] = useState(null);
    const [currentCards, setCurrentCards] = useState(null);

    useEffect(() => {
        async function loadDeck() {
            setCurrentDeck([]);
            setCurrentCards([]);

            try {
                const response = await readDeck(params.deckId);
                setCurrentDeck(response);
                const {cards} = response;
                setCurrentCards(cards);
            }catch (error) {console.log(error)}
        }
        loadDeck()
    }, [params])

   
    //shows the deck of cards after it has successfully been retrieved from the API server
    if (currentDeck && currentCards) {
        return(
            <div>
                <div>
                    <Link to="/">Home</Link> / {currentDeck.name}
                </div>
                <div>
                    <h2>{currentDeck.name}</h2>
                    <p>{currentDeck.description}</p>
                    <button onClick={()=> {history.push(`/decks/${currentDeck.id}/edit`)}}>
                        <span className="oi oi-pencil">
                            Edit
                        </span>                        
                    </button>
                    <button onClick={()=> {history.push(`/decks/${currentDeck.id}/study`)}}>
                        <span className="oi oi-book">
                            Study
                        </span>
                    </button>
                    <button onClick={()=> {history.push(`/decks/${currentDeck.id}/cards/new`)}}>
                        <span className="oi oi-plus">
                            Add Cards
                        </span>
                    </button>
                    <button onClick={()=> {
                        if(window.confirm("Delete this deck?")){
                            deleteDeck(`${currentDeck.id}`);
                            history.push("/");
                        }
                    }}>
                        <span className="oi oi-trash" />
                    </button>
                </div>
                <div>
                    <h1>Cards</h1>
                    <ul>
                        {currentCards.map((card) => (
                            <li key={card.id}>
                                <div>{card.front}</div>
                                <div>
                                    {card.back}
                                    <button onClick={()=> {history.push(`/decks/${currentDeck.id}/cards/${card.id}/edit`)}}>
                                        <span className="oi oi-pencil">
                                            Edit
                                        </span>   
                                    </button>
                                    <button onClick={()=> {
                                        if(window.confirm("Delete this card?")){
                                            deleteCard(`${card.id}`);
                                            history.push(`/decks/${params.deckId}`);
                                        }
                                    }}>
                                        <span className="oi oi-trash" />
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    };

    return (
        <p>Loading...</p>
    );
};

export default Deck;