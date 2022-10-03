import {useState} from "react";

function App() {
  const [boards, setBoards] = useState([
    {
      id: 1,
      title: "Сделать",
      items: [{id: Date.now() * Math.random(), title: 'Пойти в магазин'}, {id: Date.now()* Math.random(), title: 'Выкинуть мусор'}, {id: Date.now()* Math.random(), title: 'Купить молоко'}]
    },
    {
      id: 2,
      title: "Проверить",
      items: [{id: Date.now() * Math.random(), title: 'Код ревью'}, {id: Date.now() * Math.random(), title: 'Задача на факториал'}, {id: Date.now() * Math.random(), title: 'новая таска'}]
    },
    {
      id: 3,
      title: "Сделано",
      items: [{id: Date.now()* Math.random(), title: 'Почитать'}, {id: Date.now() * Math.random(), title: 'Английский'}, {id: Date.now() * Math.random(), title: 'Приготовить обед'}]
    },
  ])
  const [currentBoard, setCurrentBoard] = useState(null)
  const [currentItem, setCurrentItem] = useState(null)


  const dragOverHandler = (e) => {
    e.preventDefault()
    if (e.target.className === 'item') {
      e.target.style.boxShadow = '0 2px 3px gray'
    }
  };
  const dragLeaveHandler = (e) => {
    e.target.style.boxShadow = 'none'
  };

  const dragEndHandler = (e) => {
    e.target.style.boxShadow = 'none'
  };

  const dragStartHandler = (e, board, item) => {
    setCurrentBoard(board)
    setCurrentItem(item)
  };

  const dropHandler = (e, board, item) => {
    e.preventDefault()
    const currentIndex = currentBoard.items.indexOf(currentItem)
    currentBoard.items.splice(currentIndex, 1)

    const dropIndex = board.items.indexOf(item)
    board.items.splice(dropIndex+1, 0, currentItem)
    setBoards(boards.map(b => {
      if (b.id === board.id) {
        return board
      }
      if (b.id === currentBoard.id) {
        return currentBoard
      }
      return b
    }))
    e.target.style.boxShadow = 'none'
  };



  const dropCardHandler = (e, board) => {
    board.items.push(currentItem)
    const currentIndex = currentBoard.items.indexOf(currentItem)
    currentBoard.items.splice(currentIndex, 1)

    setBoards(boards.map(b => {
      if (b.id === board.id) {
        return board
      }
      if (b.id === currentBoard.id) {
        return currentBoard
      }
      return b
    }))
    e.target.style.boxShadow = 'none'
  };

  return (
    <div className="App">
      {boards.map(board => (
        <div
          className={'board'}
          key={board.id}
          onDragOver={(e) => dragOverHandler(e)}
          onDrop={(e) => dropCardHandler(e, board)}

        >
          <div className={'board__title'} >{board.title}</div>
          {board.items.map(item => (
              <div
                key={item.id}
                onDragOver={(e) => dragOverHandler(e)}
                onDragLeave={(e) => dragLeaveHandler(e)}
                onDragStart={(e) => dragStartHandler(e, board, item)}
                onDragEnd={(e) => dragEndHandler(e)}
                onDrop={(e) => dropHandler(e, board, item)}
                className={'item'}
                draggable={true}
              >
                {item.title}
              </div>
            ))}
        </div>
      ))}
    </div>
  );
}

export default App;
