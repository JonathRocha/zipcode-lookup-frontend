import { useReactiveVar } from "@apollo/client";
import { FormEvent, ChangeEvent, useCallback, useReducer, useMemo } from "react";
import { isFetchingAddress, useAddressSearch } from "../../hooks/useAddressSearch/useAddressSearch";
import { AddressLookupForm, AddressLookupFormAction, AddressLookupFormActionType } from "./definition";

import "./styles.scss";

const formInitialState: AddressLookupForm = {
  zipCode: "",
  country: "US",
};

function reducer(state: AddressLookupForm, action: AddressLookupFormAction) {
  switch (action.type) {
    case AddressLookupFormActionType.SET_ZIP_CODE:
      return { ...state, zipCode: action.payload };
    case AddressLookupFormActionType.SET_COUNTRY:
      return { ...state, country: action.payload };
    case AddressLookupFormActionType.RESET:
      return formInitialState;
    default:
      return state;
  }
}

export const Form = () => {
  const [state, dispatch] = useReducer(reducer, formInitialState);
  const { search } = useAddressSearch();
  const isLoading = useReactiveVar(isFetchingAddress);
  const shouldDisableSubmit = useMemo(
    () => isLoading || !state.zipCode || !state.country,
    [isLoading, state.zipCode, state.country],
  );

  const fieldNameTypeMapper = useMemo(
    () => ({
      zipcode: AddressLookupFormActionType.SET_ZIP_CODE,
      country: AddressLookupFormActionType.SET_COUNTRY,
    }),
    [],
  );

  const resetForm = useCallback(() => {
    dispatch({ type: AddressLookupFormActionType.RESET, payload: undefined });
  }, []);

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      await search(state.zipCode, state.country);
      resetForm();
    },
    [search, state, resetForm],
  );

  const handleOnChange = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = event.target;
      dispatch({ type: fieldNameTypeMapper[name], payload: value });
    },
    [fieldNameTypeMapper],
  );

  return (
    <form className="lookup-form" onSubmit={handleSubmit}>
      <legend>Search for your city</legend>

      <div className="lookup-form_group">
        <label htmlFor="country">Country</label>
        <select
          id="country"
          name="country"
          className="lookup-form_group--select"
          onChange={handleOnChange}
          value={state.country}
        >
          <option value="US">US</option>
          <option value="BR">BR</option>
        </select>
      </div>

      <div className="lookup-form_group">
        <label htmlFor="zipcode">Zip code</label>
        <input
          type="text"
          id="zipcode"
          name="zipcode"
          placeholder="Type your zip code"
          className="lookup-form_group--input"
          onChange={handleOnChange}
          value={state.zipCode}
        />
      </div>

      <div className="lookup-fomr_group">
        <button type="submit" className="lookup-form_group--submit" disabled={shouldDisableSubmit}>
          {isLoading ? "Loading..." : "Send"}
        </button>
      </div>
    </form>
  );
};

export * from "./definition";
