import {shallowEqual, useDispatch, useSelector} from "react-redux";


import type {AppState} from "site/digital/state";

import type {AllActions} from "site/digital/state/actions";

import type {ThunkDispatch} from "redux-thunk";


export const useDigitalDispatch = () => useDispatch<ThunkDispatch<AppState, undefined, AllActions>>();

export const useDigitalSelector = <TSelected = unknown>(
    selector: (state: AppState) => TSelected,
    equalityFn: (left: TSelected, right: TSelected) => boolean = shallowEqual,
) => useSelector<AppState, TSelected>(selector, equalityFn)
