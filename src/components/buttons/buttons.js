import './../buttons/buttons.css';
export default function Button({setOpacity, opacity, setShowLayers}) {

    return (
        <div  className='buttons_hub'>
                <button className='button' onClick={() => {setShowLayers(true)}}>Replace</button>
                <button className='button' onClick={() => {setOpacity(opacity-.1)}}>Brighten</button>
        </div>
    )
}