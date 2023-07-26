import { useStateContext } from "../contexts/ContextProvider";
import { useEffect, useState } from "react";
import axiosClient from "../axios";
import PaginationLinks from "../components/PaginationLinks";
import HotelListItem from "../components/hoteles/HotelListItem";

function HomePage() {
    const { showToast } = useStateContext();
    const [hotels, setHotels] = useState([]);
    const [meta, setMeta] = useState({});
    const [loading, setLoading] = useState(false);

    const onDeleteClick = (id) => {
        if (window.confirm("¿Esta seguro de eliminar este hotel?")) {
            axiosClient.delete(`/hotel/${id}`).then(() => {
                getHotels();

                showToast("El hotel fue eliminado");
            });
        }
    };

    const onPageClick = (link) => {
        getHotels(link.url);
    };

    const getHotels = (url) => {
        url = url || "/hotel";

        setLoading(true);

        axiosClient.get(url).then(({ data }) => {
            setHotels(data.data);

            setMeta(data.meta);

            setLoading(false);
        });
    };

    useEffect(() => {
        getHotels();
    }, []);

    return (
        <>
            {loading && <div className="text-center text-lg">Loading...</div>}

            {!loading && (
                <div>
                    {hotels.length === 0 && (
                        <div className="py-8 text-center">
                            No tiene hoteles creados
                        </div>
                    )}

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
                        {hotels.map((hotel) => (
                            <HotelListItem
                                hotel={hotel}
                                key={hotel.id}
                                onDeleteClick={onDeleteClick}
                            />
                        ))}
                    </div>

                    {hotels.length > 0 && (
                        <PaginationLinks
                            meta={meta}
                            onPageClick={onPageClick}
                        />
                    )}
                </div>
            )}
        </>
    );
}

export default HomePage;
