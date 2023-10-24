export default function Error404() {
    return (
        <div class="error-container">
            <div className="w-100">
                <img 
                    className="text-center mx-auto d-block"
                    style={{marginBottom: '20px'}}
                    src="https://media.giphy.com/media/6uGhT1O4sxpi8/giphy.gif"
                    alt="Not found"
                />
                <div className="error-description text-center">La page que vous cherchez n'existe pas</div>
            </div>
      </div>
    )
}