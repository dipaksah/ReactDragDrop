import { memo } from 'react';
import { useDrop } from 'react-dnd';
import {Row,Col} from 'reactstrap';
// import { ItemTypes } from './ItemTypes';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

const style = {
    height: 'max-content',
    width: '12rem',
    color: 'white',
    padding: '1rem',
    textAlign: 'center',
    fontSize: '1rem',
    
};

// const AnswerBox={
//     width:'555px',
//     marginLeft:'500px',
//     marginTop:'20px',
//     backgroundColor:'#A4ABAF'
// };

export const Dustbin = memo(function Dustbin({ accept, lastDroppedItem, onDrop, allQuestion }) {

    // console.log(lastDroppedItem);
    const [{ isOver, canDrop }, drop] = useDrop({
        accept,
        drop: onDrop,
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    });
    // console.log(allQuestion);
    const isActive = isOver && canDrop;
    let backgroundColor = '#222';
    if (isActive) {
        backgroundColor = 'darkgreen';
    }
    else if (canDrop) {
        backgroundColor = 'darkkhaki';
    }
    return (
        <div className='MainBox'>
            <Row className='RowBox'>
                <Col xs="8" className='answer'>
                    <div role="Dustbin" className='listanswer'>
                        <h2>{allQuestion.question}</h2> 
                    </div>
                </Col>
                
                <Col xs="4">
                    <div ref={drop} role="Dustbin" style={{ ...style, backgroundColor }}>
                        {isActive}
                        {<p>{JSON.stringify(lastDroppedItem)}</p>}
                    </div>
                </Col>
            </Row>
        </div>
        
        );
});
