import { Wrapper } from "@googlemaps/react-wrapper";
import { connect } from "react-redux";
import CircularProgress from '@mui/joy/CircularProgress';
import GoogleMap, { Marker } from '@components/GoogleMap'
import SearchForm from "@components/SearchForm";

function App({ selectedPlace }) {
    const render = (status) => {
        return <CircularProgress />;
    };
    const defaultCenterCoordinate = { lat: 3.1348303682222918, lng: 101.7130285638099 }

    return (
        <div style={{ position: 'relative' }}>
            <Wrapper apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY} render={render} libraries={["places"]}>
                <SearchForm />
                <GoogleMap center={selectedPlace?.geometry?.location || defaultCenterCoordinate}>
                    <Marker position={selectedPlace?.geometry?.location} />
                </GoogleMap>
            </Wrapper>
        </div>
    )
}

const mapStateToProps = state => ({
    selectedPlace: state.selectedPlace.currentSelectedPlace
});
export default connect(mapStateToProps, null)(App)
