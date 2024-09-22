import notification1 from "./assets/image-1.png";
import notification2 from "./assets/image-2.png";
import notification3 from "./assets/image-3.png";
import notification4 from "./assets/image-4.png";

const Notification = ({ className, title }) => {
  return (
    <div
      className={`${
        className || ""
      } flex items-center p-4 pr-6 bg-n-9/40 backdrop-blur border border-n-1/10 rounded-2xl gap-5`}
    >
      <img
        src={notification1}
        width={62}
        height={62}
        alt="image"
        className="rounded-xl"
      />

      <div className="flex-1">
        <h6 className="mb-1 font-semibold text-base">{title}</h6>

        <div className="flex items-center justify-between">
          <ul className="flex -m-0.5">
            <li className="flex w-6 h-6 border-2 border-n-12 rounded-full overflow-hidden">
              <img
                src={notification1}
                className="w-full"
                width={20}
                height={20}
                alt="notification 1"
              />
            </li>
            <li className="flex w-6 h-6 border-2 border-n-12 rounded-full overflow-hidden">
              <img
                src={notification2}
                className="w-full"
                width={20}
                height={20}
                alt="notification 2"
              />
            </li>
            <li className="flex w-6 h-6 border-2 border-n-12 rounded-full overflow-hidden">
              <img
                src={notification3}
                className="w-full"
                width={20}
                height={20}
                alt="notification 3"
              />
            </li>
            <li className="flex w-6 h-6 border-2 border-n-12 rounded-full overflow-hidden">
              <img
                src={notification4}
                className="w-full"
                width={20}
                height={20}
                alt="notification 4"
              />
            </li>
          </ul>
          <div className="body-2 text-n-13">1m ago</div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
