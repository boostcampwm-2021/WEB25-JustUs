import styled from "styled-components";
import COLOR from "@styles/Color";

interface IData {
  [key: string]: string;
}

const SearchResult = ({ searchResult }: any) => {
  return (
    <SearchResultWrapper>
      {searchResult.map((location: IData) => (
        <PlaceWrapper>
          <PlaceName>{location.place_name}</PlaceName>
          <RoadAddressName>{location.road_address_name}</RoadAddressName>
          <AddressName>
            <img src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_jibun.png" />
            {location.address_name}
          </AddressName>
        </PlaceWrapper>
      ))}
    </SearchResultWrapper>
  );
};
const SearchResultWrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`;

const PlaceWrapper = styled.div`
  cursor: pointer;
  border-bottom: 1px solid ${COLOR.BLACK};
  padding: 0.5rem;

  &:hover {
    background: ${COLOR.GRAY};
  }
`;

const PlaceName = styled.div`
  font-size: 1rem;
  font-weight: bold;
  margin-top: 0.3rem;
`;

const RoadAddressName = styled.div`
  font-size: 0.8rem;
  margin-top: 0.3rem;
`;

const AddressName = styled.div`
  display: flex;
  color: ${COLOR.DARKGRAY};
  font-size: 0.8rem;
  margin: 0.3rem 0;
`;

export default SearchResult;
