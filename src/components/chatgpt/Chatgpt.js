import { useEffect, useState } from 'react'
import { Configuration, OpenAIApi } from 'openai'
import { AiFillTwitterCircle } from 'react-icons/ai'
import { ScaleLoader } from 'react-spinners'
import "./Chatgpt.css"
const Chatgpt = () => {
    const configuration = new Configuration({
        apiKey : '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'
    })
    const openai = new OpenAIApi(configuration)
    const [loading, setLoading] = useState(false)
    const [index, setIndex] = useState(0)
    const [currentTextIndex, setCurrentTextIndex] = useState('')
    const [prompt, setPrompt] = useState('')
    const [response, setResponse ] = useState('')
    const sendMessage = async () => {
        const response = await openai.createCompletion({
            model : 'text-davinci-003',
            prompt : prompt, 
            temperature : 0, 
            max_tokens : 500
        })
        setResponse(response.data.choices[0].text)
        setLoading(false)
    }
    const updatePrompt = (e) => {
        setPrompt(e.target.value)
    }
    const submitForm = (e) => {
        e.preventDefault()
        //checking if the button is processing something 
        if(loading){
            return
        }
        setLoading(true)
        sendMessage()
        setIndex(0)
        setResponse('')
        setCurrentTextIndex('')
    }
    useEffect(() => {
        const interval = setInterval(() => {
            setIndex(prev => prev + 1)
        }, 20)
        if(index >= response.length){
            clearInterval(interval)
        }
        return () => clearInterval(interval)
    }, [index, response])

    useEffect(() => {
        if(response.length >= 1){
            setCurrentTextIndex(prev => prev + response[index])
        }
        if(index >= response.length){
            setCurrentTextIndex(response)
        }
    }, [index])
    return(
        <section>
            <header className='header container'> 
                <h2>Chatgpt</h2>
                <a
                    target = "_blank"
                    href='https://twitter.com/harmony_web3'
                > 
                    <AiFillTwitterCircle 
                        className='twitter__icon'
                    />
                </a>
            </header>
            <div className='container'> 
                <div className='response'>
                    {currentTextIndex}
                </div>
            </div>
            <form 
                className='message__form container'
                onSubmit={submitForm}
            >
                <textarea 
                    type={"text"}
                    placeholder = {"Type your message..."}
                    name = {"prompt"}
                    className = {"message__form-input"}
                    rows = {1}
                    value = {prompt}
                    onChange = {updatePrompt}
                    required
                >
                </textarea>
                <button 
                    className='message__form-submit'
                    style={{
                        cursor : loading ? 'wait' : 'pointer',
                        display : loading ? 'flex' : 'inline-block',
                        gap : 4,
                    }}
                >Send
                {
                    loading ? 
                    <ScaleLoader
                     width={2}
                     height = {15}
                     color = {"#fff"}
                    /> 
                    : ""
                    
                }
                </button>
            </form>
        </section>
    )
}
export default Chatgpt