import axios from 'axios';
import { CurrencyModel } from '@/models/CurrencyModel';

let CountryNameMap = new Map();
CountryNameMap.set("IDR", "Indonesian Rupiah");
CountryNameMap.set("EUR", "Euro");
CountryNameMap.set("GBP", "Pound Sterling");
CountryNameMap.set("SGD", "Singapore Dollar");
CountryNameMap.set("USD", "United States Dollar");
CountryNameMap.set("CAD", "Canadian Dollar");
CountryNameMap.set("JPY", "Japanese Yen");
CountryNameMap.set("KRW", "South Korean Won");
CountryNameMap.set("MYR", "Malaysian Ringgit");
CountryNameMap.set("CHF", "Swiss Franc");
CountryNameMap.set("INR", "Indian Rupee");

function toggleExchangesAvailability(code: string, isActive: boolean) {
    let selectedExchangeIndex = state.availableExchanges.findIndex(availableExchange => availableExchange.code == code);

    state.availableExchanges[selectedExchangeIndex] = {
        code: code,
        isActive: isActive
    };
}

const state = {
    currencies: [{}],
    baseAmount: 0.00,
    availableExchanges: [
        { code: "IDR", isActive: false },
        { code: "EUR", isActive: false },
        { code: "GBP", isActive: false },
        { code: "SGD", isActive: false },
        { code: "CAD", isActive: false },
        { code: "JPY", isActive: false },
        { code: "KRW", isActive: false },
        { code: "INR", isActive: false },
        { code: "CHF", isActive: false },
        { code: "USD", isActive: false },
        { code: "MYR", isActive: false }
    ]
};

const getters = {
    getCurrencies: (state: any) => state.currencies,
    getAvailableExchanges: (state: any) => (state.availableExchanges.filter((availableExchange: any) => !availableExchange.isActive))
};

const actions = {
    async fetchCurrencies({ commit }: any, code: string) {

        state.availableExchanges = [
            ...state.availableExchanges.filter(availableExchange => availableExchange.code != code),
            { code: code, isActive: true }
        ];


        let activeExchangeCodes = state.availableExchanges.filter(availableExchange => availableExchange.isActive).map(availableExchange => availableExchange.code);

        let joinedCodes = activeExchangeCodes.join(',');
        const response = await axios.get(`https://api.exchangeratesapi.io/latest?base=USD&symbols=${joinedCodes}`);
        let rawExchangeData = response.data;

        state.currencies = []
        activeExchangeCodes.forEach(activeExchangeCode => {
            let currentExchange: CurrencyModel = {
                code: activeExchangeCode,
                name: CountryNameMap.get(activeExchangeCode),
                rateAgainstBase: rawExchangeData.rates[activeExchangeCode],
                exchangeAmount: rawExchangeData.rates[activeExchangeCode] * state.baseAmount
            };

            state.currencies.push(currentExchange);
        });
        let payload = {
            currencies: state.currencies,
            code: code
        }
        commit('setCurrencies', payload);
    }
};

const mutations = {
    setCurrencies(state: any, payload: any) {
        state.currencies = payload.currencies;
    },
    setBaseAmount(state: any, baseAmount: number) {
        state.currencies.forEach((currency: any) => {
            currency.exchangeAmount = currency.rateAgainstBase * baseAmount;
        });
        state.baseAmount = baseAmount
    },
    removeCurrency(state: any, code: string) {
        state.currencies = state.currencies.filter((currency: CurrencyModel) => currency.code !== code);
        state.availableExchanges = [
            ...state.availableExchanges.filter((availableExchange: CurrencyModel) => availableExchange.code != code),
            { code: code, isActive: false }
        ];
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}