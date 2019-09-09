import React from 'react';

import { Spinner } from 'reactstrap';

type Props = { loading: boolean };

const withSpinner = (WrapperComponent: React.ReactType) => {
  return class extends React.Component<Props> {
    render() {
      const { loading, ...otherProps } = this.props;

      return loading ? (
        <Spinner color="primary" />
      ) : (
        <WrapperComponent {...otherProps} />
      );
    }
  };
};

export default withSpinner;
