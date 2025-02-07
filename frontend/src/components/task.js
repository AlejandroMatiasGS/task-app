import { Delete, MoreVert } from "@mui/icons-material";

export default function Task({ id, title, handleClick, handleDelete }) {

    return (
        <>
            <button id={id} className="flex justify-center items-center w-[425px] h-44 border rounded-lg my-3 border-gray-700 dark:border-gray-400" onClick={handleClick}>
                <div className="relative w-full h-full">
                    <div role="button" className="absolute top-2 right-2 px-2 py-2" onClick={handleDelete}>
                        <Delete sx={{ fontSize: 20 }} className="text-black dark:text-white"></Delete>
                    </div>
                    <div className="flex justify-center items-center h-full w-full">
                        <p className="text-xl font-bold text-black dark:text-white truncate px-2 pt-4">{title}</p>
                    </div>
                </div>
            </button>
        </>
    )
}