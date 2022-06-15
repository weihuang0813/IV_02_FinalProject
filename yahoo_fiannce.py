import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
import datetime
import statsmodels.api as sm
from statsmodels import regression

from pandas_datareader import data as pdr
import yfinance as yf
stock_list = ['^TWII', '2330.TW' ,'2454.TW', '2317.TW', '2308.TW', '2303.TW', '2881.TW', '1301.TW', '1303.TW', '2882.TW', '2002.TW',
              '2412.TW','2891.TW','3711.TW', '2886.TW', '1216.TW', '2884.TW', '3008.TW', '2885.TW', '3034.TW', '1326.TW', '2357.TW',
              '1101.TW','5871.TW','2379.TW', '2382.TW', '2327.TW', '2892.TW', '5880.TW', '6415.TW', '2207.TW', '2880.TW', '3045.TW',
              '2887.TW','6505.TW','2912.TW', '5876.TW', '4938.TW', '1590.TW', '2395.TW', '2474.TW', '1402.TW', '1102.TW', '2801.TW',
              '9910.TW','4904.TW','2105.TW', '6669.TW', '8046.TW', '2408.TW', '2633.TW']
df_list = pdr.get_data_yahoo(stock_list, start = "2020-01-03", end = "2022-6-15")

# # print(df3.loc['2017-'+str(8)+'-31'])
# print(df_list)

df_list.reset_index(inplace=True,drop=False)

def linreg(x, y):
  x = sm.add_constant(x)
  model = regression.linear_model.OLS(y, x).fit()

  x = x[:,1]
  return model.params[0], model.params[1]


def convert_date(num):
  # Data Index should be timeSeries
  num["Date"] = pd.to_datetime(num["Date"], format='%d-%m-%Y')
  # upsample
  dfn = num.set_index("Date").resample('D').asfreq()

  # covert Date to Monday .. Sunday
  dfn['Day'] = dfn.index.strftime('%A')

  # drop Day in ['Saturday', 'Sunday']
  cond = dfn['Day'].isin(['Saturday', 'Sunday'])
  dfn = dfn[~cond].fillna(method='ffill').reset_index()
  return dfn

dfn2 = convert_date(df_list)
# dfn2.to_csv('stock_full.csv')
return_stock = dfn2.Close.pct_change()[1:]
return_stock['Date'] = dfn2["Date"]
# print(type(return_stock))
return_stock.rename(columns={"2330.TW":"2330","2454.TW":"2454","2317.TW":"2317","2308.TW":"2308","2303.TW":"2303","2881.TW":"2881",
                             "1301.TW":"1301","1303.TW":"1303","2882.TW":"2882","2002.TW":"2002","2412.TW":"2412","2891.TW":"2891",
                             "3711.TW":"3711","2886.TW":"2886","1216.TW":"1216","2884.TW":"2884","3008.TW":"3008","2885.TW":"2885",
                             "3034.TW":"3034","1326.TW":"1326","2357.TW":"2357","1101.TW":"1101","5871.TW":"5871","2379.TW":"2379",
                             "2382.TW":"2382","2327.TW":"2327","2892.TW":"2892","5880.TW":"5880","6415.TW":"6415","2207.TW":"2207",
                             "2880.TW":"2880","3045.TW":"3045","2887.TW":"2887","6505.TW":"6505","2912.TW":"2912","5876.TW":"5876",
                             "4938.TW":"4938","1590.TW":"1590","2395.TW":"2395","2474.TW":"2474","1402.TW":"1402","1102.TW":"1102",
                             "2801.TW":"2801","9910.TW":"9910","4904.TW":"4904","2105.TW":"2105","6669.TW":"6669","8046.TW":"8046",
                             "2408.TW":"2408","2633.TW":"2633"},inplace=True)
return_stock.to_csv('dataset/stock.csv')
# print(return_goog[2])
# plt.figure(figsize=(20, 10))
# return_goog.plot()
# #return_spy.plot()
# return_TWII.plot()
# plt.ylabel("Daily Return of GOOG and SPY")
# plt.show()
# stock = pd.read_csv('stock.csv')

# mask = (stock['Date'] > "2020-01-03") & (stock['Date'] <= "2020-02-03")
# df = stock.loc[mask]
# print(df) # get range of time

# del stock["Date"]
# print(stock)
# X = stock.values
# # Y = stock['GOOG'].values
# Z = stock['^TWII'].values
# # W = stock['NVDA'].values
# #print(len(X),len(Y),len(Z))

# # alpha, beta = linreg(W, Z)
# # print("alpha: ", str(alpha))
# # print("beat: ", str(beta))

# for i in range(X.shape[1]):
#   if(i+1<X.shape[1]):
#     alpha1, beta1 = linreg(X[:,i+1], Z)
#     print(stock_list[i])
#     # print("alpha: ", str(alpha1))
#     print("beta: ", str(beta1))
#     print("\n")

# X2 = np.linspace(X.min(), X.max(), 100)
# Y_hat = X2 * beta + alpha

# plt.figure(figsize = (10, 7))
# plt.scatter(X, Y, alpha = 0.3)
# plt.xlabel("SPY Daily Return")
# plt.ylabel("GOOG Daily Return")

# plt.plot(X2, Y_hat, "r", alpha = 0.)