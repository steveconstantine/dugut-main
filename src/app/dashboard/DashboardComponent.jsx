import React from 'react';

class DashboardComponent extends React.Component {
  render() {
    const { userName } = this.props;

    return (
      <div>
        Good morning, { userName }. This is the dashboard.
      </div>
    );
  }
}

export default DashboardComponent;
