export default function NotFound(props)
{
    return (
        <div class="error-container">
            <div className="w-100">
                <img 
                    className="text-center mx-auto d-block"
                    style={{marginBottom: '20px'}}
                    src="https://media.giphy.com/media/6uGhT1O4sxpi8/giphy.gif"
                    alt="Not found"
                />
                <div className="error-description text-center">{props.message}</div>
            </div>
      </div>
    )
}