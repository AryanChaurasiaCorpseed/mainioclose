import { configureStore } from "@reduxjs/toolkit"
import { combineReducers } from "redux"
import AuthSlice from "./Slices/AuthSlice"
import UsersSlice from "./Slices/UsersSlice"
import persistReducer from "redux-persist/es/persistReducer"
import storage from "redux-persist/lib/storage"
import persistStore from "redux-persist/es/persistStore"
import LeadSlice from "./Slices/LeadSlice"
import NotificationSlice from "./Slices/NotificationSlice"
import TicketSlice from "./Slices/TicketSlice"
import ForgetPasswordSlice from "./Slices/ForgetPasswordSlice"
import SignUpSlice from "./Slices/SignUpSlice"
import ApprovedStatusSlice from "./Slices/ApprovedStatus"
import UserRatingSlice from "./Slices/UserRatingSlice"
import LeadSlugSlice from "./Slices/LeadSlugSlice"
import LeadUrlSlice from "./Slices/LeadUrlSlice"
import HistorySlice from "./Slices/HistorySlice"
import CompanySlice from "./Slices/CompanySlice"
import ProjectSlice from "./Slices/ProjectSlice"
import RatingSlice from "./Slices/RatingSlice"
import UserProfileSlice from "./Slices/UserProfileSlice"
import ComplianceSlice from "./Slices/ComplianceSlice"
import IvrSlice from "./Slices/IvrSlice"
import SettingSlice from "./Slices/SettingSlice"
import CommonSlice from "./Slices/CommonSlice"
import IndustrySlice from "./Slices/IndustrySlice"
import DasboardSlice from "./Slices/DasboardSlice"


const reducers = combineReducers({
  auth: AuthSlice,
  user: UsersSlice,
  leads: LeadSlice,
  notify: NotificationSlice,
  tickets: TicketSlice,
  password: ForgetPasswordSlice,
  signup: SignUpSlice,
  approved: ApprovedStatusSlice,
  rating: UserRatingSlice,
  leadslug: LeadSlugSlice,
  leadurls: LeadUrlSlice,
  uhistory: HistorySlice,
  company: CompanySlice,
  project: ProjectSlice,
  ratingn: RatingSlice,
  profile: UserProfileSlice,
  compliance: ComplianceSlice,
  ivr: IvrSlice,
  setting: SettingSlice,
  common: CommonSlice,
  industry:IndustrySlice,
  dashboard:DasboardSlice
})

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
}

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export const persistor = persistStore(store)
