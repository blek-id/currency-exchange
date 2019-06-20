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
    getCurrencies: (myState: any) => myState.currencies,
    getAvailableExchanges: (myState: any) => (myState.availableExchanges
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
        const response = await axios.get(`https://api.exchangeratesapi.io/latest`, {
            params: {
                base: 'USD',
                symbols: joinedCodes,
            },
        });
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
    setCurrencies(myState: any, currencies: any) {
        myState.currencies = currencies;
    },
    setBaseAmount(myState: any, baseAmount: number) {
        myState.currencies
            .forEach((currency: any) => {
                currency.exchangeAmount = currency.rateAgainstBase * baseAmount;
            });
        myState.baseAmount = baseAmount;
    },
    removeCurrency(myState: any, code: string) {
        myState.currencies = myState.currencies
            .filter((currency: CurrencyModel) => currency.code !== code);
    },
    updateAvailableExchanges(myState: any, payload: any) {
        const selectedExchangeIndex = myState.availableExchanges
            .findIndex((availableExchange: any) => availableExchange.code === payload.code);

        myState.availableExchanges = [
            ...myState.availableExchanges.slice(0, selectedExchangeIndex),
            { code: payload.code, isActive: payload.isActive },
            ...myState.availableExchanges.slice(selectedExchangeIndex + 1),
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
