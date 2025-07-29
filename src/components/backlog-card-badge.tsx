// Backlog Card Badge Requirements
import { AiOutlineLoading3Quarters } from "react-icons/ai";
// Backlog Card Badge Props
interface Props {
  title: string;
  value: string;
  logo: React.ReactNode;
}
// Backlog Card Badge Main Function
function BacklogCardBadge({ title, value, logo }: Props) {
  // Returns Backlog Card Badge
  return (
    // Backlog Card Badge Main Container
    <div className="flex place-content-between items-center gap-2 bg-gray-800 py-1 px-4 rounded-md">
      {/* Backlog Card Badge Information Container */}
      <div className="flex flex-col gap-1 text-sm">
        <span>
          <strong>{title}</strong>
        </span>
        <span className="line-clamp-1">{value}</span>
      </div>
      {/* Backlog Card Badge Logo */}
      {logo !== null ? (
        logo
      ) : (
        // If it is loading
        <AiOutlineLoading3Quarters className="w-[52px] h-[52px] animate-spin p-2" />
      )}
    </div>
  );
}

export default BacklogCardBadge;
