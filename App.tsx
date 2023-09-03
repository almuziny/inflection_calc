/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
  Pressable,
} from 'react-native';
import Crashes from 'appcenter-crashes';
import Analytics from 'appcenter-analytics';

type MyProps = {};

type MyState = {
  inflationRate: number;
  riskFreeRate: number;
  amount: number;
  timeInYears: number;
  afterInflation: number;
  atRiskFree: number;
  atRiskFreeAfterInflation: number;
  difference: number;
};

export default class App extends React.Component<MyProps, MyState> {
  constructor(props: any) {
    super(props);

    this.state = {
      inflationRate: 0.0,
      riskFreeRate: 0.0,
      amount: 0.0,
      timeInYears: 1,
      afterInflation: 0.0,
      atRiskFree: 0.0,
      atRiskFreeAfterInflation: 0.0,
      difference: 0,
    };

    this.checkPreviousSession();
  }

  calculateInflationImpact(value: any, inflationRate: any, time: any) {
    return value / Math.pow(1 + inflationRate, time);
  }

  calculate() {
    console.log('====================================');
    console.log('states => ', this.state);
    console.log('====================================');
    const afterInflation = this.calculateInflationImpact(
      this.state.amount,
      this.state.inflationRate / 100,
      this.state.timeInYears,
    );
    const atRiskFree =
      this.state.amount *
      Math.pow(1 + this.state.riskFreeRate / 100, this.state.timeInYears);

    const atRiskFreeAfterInflation = this.calculateInflationImpact(
      atRiskFree,
      this.state.inflationRate / 100,
      this.state.timeInYears,
    );
    const difference = atRiskFreeAfterInflation - afterInflation;

    this.setState({
      afterInflation,
      atRiskFree,
      atRiskFreeAfterInflation,
      difference,
    });
  }

  async checkPreviousSession() {
    const didCrash = await Crashes.hasCrashedInLastSession();
    if (didCrash) {
      Alert.alert("Sorry about that crash, we're working on a solution");
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="Current inflation rate"
          style={styles.textBox}
          keyboardType="decimal-pad"
          onChangeText={inflationRate =>
            this.setState({inflationRate: parseFloat(inflationRate)})
          }
        />
        <TextInput
          placeholder="Current risk free rate"
          style={styles.textBox}
          keyboardType="decimal-pad"
          onChangeText={riskFreeRate =>
            this.setState({riskFreeRate: parseFloat(riskFreeRate)})
          }
        />
        <TextInput
          placeholder="Amount you want to save"
          style={styles.textBox}
          keyboardType="decimal-pad"
          onChangeText={amount => this.setState({amount: parseFloat(amount)})}
        />
        <TextInput
          placeholder="For how long (in years) will you save?"
          style={styles.textBox}
          keyboardType="decimal-pad"
          onChangeText={timeInYears =>
            this.setState({timeInYears: parseFloat(timeInYears)})
          }
        />
        <Pressable
          style={styles.button}
          onPress={() => {
            this.calculate();
            Analytics.trackEvent('calculate_inflation', {
              Internet: 'WiFi',
              GPS: 'Off',
            });
          }}>
          <Text style={styles.buttonText}>Calculate inflation</Text>
        </Pressable>
        <Text style={styles.label}>
          {this.state.timeInYears} years from now you will still have $
          {this.state.amount} but it will only be worth $
          {this.state.afterInflation}.
        </Text>
        <Text style={styles.label}>
          But if you invest it at a risk free rate you will have $
          {this.state.atRiskFree}.
        </Text>
        <Text style={styles.label}>
          Which will be worth ${this.state.atRiskFreeAfterInflation} after
          inflation.
        </Text>
        <Text style={styles.label}>
          A difference of: ${this.state.difference}.
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    marginHorizontal: 16,
  },
  label: {
    marginTop: 10,
  },
  textBox: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 10,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});
