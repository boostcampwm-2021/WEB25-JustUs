import styled from "styled-components";
import COLOR from "@styles/Color";
import React, { Dispatch, SetStateAction, UIEvent, useEffect, useRef } from "react";

interface IData {
  [key: string]: string;
}
interface ILocation {
  placeName: string;
  x: number;
  y: number;
}
interface SearchResultProps {
  searchResult: IData[];
  setSelectedLocation: Dispatch<SetStateAction<ILocation>>;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  lastPage: number;
}

const SearchResult = ({ searchResult, setSelectedLocation, page, setPage, lastPage }: SearchResultProps) => {
  const data = searchResult;
  const searchResultWrapperRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const handleClickPlaceWrapper = (location: IData) => {
    setSelectedLocation({ placeName: location.place_name, x: Number(location.x), y: Number(location.y) });
  };
  const RESULT_PLACE_ICON = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_jibun.png";

  const handleScroll = (e: UIEvent<HTMLElement>) => {
    const target = e.target as HTMLDivElement;
    const isBottom = target.scrollHeight - target.scrollTop === target.clientHeight;

    if (!isBottom) return;
    if (page === lastPage) return;

    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    if (page === 1) searchResultWrapperRef.current.scrollTop = 0;
  });

  return (
    <SearchResultWrapper ref={searchResultWrapperRef} onScroll={handleScroll}>
      {data.map((location: IData, idx) => (
        <PlaceWrapper key={idx} onClick={() => handleClickPlaceWrapper(location)}>
          <PlaceName>{location.place_name}</PlaceName>
          <RoadAddressName>{location.road_address_name}</RoadAddressName>
          <AddressName>
            <span>
              <img src={RESULT_PLACE_ICON} alt="result place icon" />
            </span>
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
  &::-webkit-scrollbar {
    width: 0.8rem;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.SECONDARY};
    border-radius: 1rem;
  }
  height: 100%;
  box-sizing: border-box;
`;
const PlaceWrapper = styled.div`
  cursor: pointer;
  padding: 0.5rem;
  box-sizing: border-box;

  &:hover {
    background: ${COLOR.GRAY};
  }
`;
const PlaceName = styled.div`
  font-size: 1.6rem;
  font-weight: bold;
  margin-top: 0.3rem;
`;
const RoadAddressName = styled.div`
  font-size: 1.4rem;
  margin-top: 0.3rem;
`;
const AddressName = styled.div`
  display: flex;
  color: ${COLOR.DARKGRAY};
  font-size: 1rem;
  margin: 0.3rem 0;
`;

export default SearchResult;
