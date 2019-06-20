import axios from 'axios';
import { CurrencyModel } from '@/models/CurrencyModel';
import { currencyNames } from '@/util/currencyNames';

const state = {
    currencies: [{
        code: '',
        exchangeAmount: 0,
        name: '',
        rateAgainstBase: 0,
    }],
    baseAmount: 10.00,
    availableExchanges: [
        { code: 'CAD', isActive: false },
        { code: 'CHF', isActive: false },
        { code: 'EUR', isActive: false },
        { code: 'GBP', isActive: false },
        { code: 'IDR', isActive: false },
        { code: 'INR', isActive: false },
        { code: 'JPY', isActive: false },
        { code: 'KRW', isActive: false },
        { code: 'MYR', isActive: false },
        { code: 'SGD', isActive: false },
        { code: 'USD', isActive: false },
    ],
};

const getters = {
    getCurrencies: (state: any) => state.currencies,
    getAvailableExchanges: (state: any) => (state.availableExchanges
        .filter((availableExchange: any) => !availableExchange.isActive)),
};

const actions = {
    async fetchCurrencies({ commit }: any, code: string) {

        const payload = {
            code,
            isActive: true,
        };
        commit('updateAvailableExchanges', payload);


        const activeExchangeCodes = state.availableExchanges
            .filter((availableExchange) => availableExchange.isActive)
            .map((availableExchange) => availableExchange.code);

        const joinedCodes = activeExchangeCodes.join(',');
        const response = await axios.get(`https://api.exchangeratesapi.io/latest?base=USD&symbols=${joinedCodes}`);
        const rawExchangeData = response.data;

        state.currencies = [];

        activeExchangeCodes.forEach((activeExchangeCode) => {
            const currentExchange: CurrencyModel = {
                code: activeExchangeCode,
                name: currencyNames.get(activeExchangeCode),
                rateAgainstBase: rawExchangeData.rates[activeExchangeCode],
                exchangeAmount: rawExchangeData.rates[activeExchangeCode] * state.baseAmount,
            };

            state.currencies.push(currentExchange);
        });

        commit('setCurrencies', state.currencies);
    },
};

const mutations = {
    setCurrencies(state: any, currencies: any) {
        state.currencies = currencies;
    },
    setBaseAmount(state: any, baseAmount: number) {
        state.currencies
            .forEach((currency: any) => {
                currency.exchangeAmount = currency.rateAgainstBase * baseAmount;
            });
        state.baseAmount = baseAmount;
    },
    removeCurrency(state: any, code: string) {
        state.currencies = state.currencies
            .filter((currency: CurrencyModel) => currency.code !== code);
    },
    updateAvailableExchanges(state: any, payload: any) {
        const selectedExchangeIndex = state.availableExchanges
            .findIndex((availableExchange: any) => availableExchange.code === payload.code);

        state.availableExchanges = [
            ...state.availableExchanges.slice(0, selectedExchangeIndex),
            { code: payload.code, isActive: payload.isActive },
            ...state.availableExchanges.slice(selectedExchangeIndex + 1),
        ];
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
