import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookMedical } from '@fortawesome/free-solid-svg-icons';

const Card = (props) => {
    const handleClick = () => {
        // Handle click logic here
    };

    return (
        <div className="cd">
            <div className="face face1" onClick={handleClick} role="button">
                <div className="content">
                    <FontAwesomeIcon icon={faBookMedical} />
                    <h3>{props.title}</h3>
                </div>
            </div>
            <div className="face face2">
                <div className="content">
                    <p>{props.description}</p>
                    <a href={props.link} type="button">Show</a>
                </div>
            </div>
        </div>
    );
};

export default Card;
