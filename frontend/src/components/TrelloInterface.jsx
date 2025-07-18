import TopNavBar from './TopNavBar';
import BoardHeader from './BoardHeader';
import BoardContent from './BoardContent';
import BottomToolbar from './Toolbar'; 

const TrelloInterface = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 via-red-500 to-pink-500">
      <TopNavBar />
      <BoardHeader />
      <BoardContent />
      <BottomToolbar />
    </div>
  );
};

export default TrelloInterface;
