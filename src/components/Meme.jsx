import React, {useState, useId, useEffect} from 'react'

export default function Meme() {
    const [meme, setMeme] = useState(
        {
            topText: "",
            bottomText: "",
            randomImage: "http://i.imgflip.com/1bij.jpg"
        }
    );

    const [allMemes, setAllMemes] = useState([]);

    useEffect(() => {
        fetch('https://api.imgflip.com/get_memes')
            .then(response => response.json())
            .then(data => setAllMemes(data.data.memes));
    }, []);
    
    const id = useId();

    function handleChange(event) {
        const {name, value} = event.target;
        setMeme(prevMeme => (
            {
                ...prevMeme,
                [name]: value
            }
        ));
    }

    function getMemeImage() {
        const rand = Math.floor(Math.random() * allMemes.length);
        setMeme(prevState => (
            {
                ...prevState,
                randomImage: allMemes[rand].url
            }
        ));
    }

    return(
        <main>
            <div className='form'>
                <div>
                    <label className='form--label' htmlFor={id + '-topText'}>Top text</label>
                    <input
                        type='text'
                        className='form--input'
                        id={id + '-topText'}
                        name='topText'
                        onChange={handleChange}
                        value={meme.topText}
                        placeholder='Shut up'
                    />
                </div>
                <div>
                    <label className='form--label' htmlFor={id + '-bottomText'}>Bottom text</label>
                    <input
                        type='text'
                        className='form--input'
                        id={id + '-bottomText'}
                        name='bottomText'
                        onChange={handleChange}
                        value={meme.bottomText}
                        placeholder='And take my money'
                    />
                </div>
                <button onClick={getMemeImage} className='form--button'>Get a new meme image 🖼</button>
            </div>
            <div className='form--meme'>
                <img src={meme.randomImage} className='meme--image' />
                <h2 className='meme--text top'>{meme.topText}</h2>
                <h2 className='meme--text bottom'>{meme.bottomText}</h2>
            </div>
        </main>
    )
}