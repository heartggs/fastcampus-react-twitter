import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export default function PostHeader() {
  const navigator = useNavigate();
  return (
    <div className="post__header">
      <button type="button" onClick={() => navigator(-1)}>
        <IoIosArrowBack className="post__header-btn" />
      </button>
    </div>
  );
}
