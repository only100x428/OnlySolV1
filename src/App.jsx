import React, { useState } from 'react';
    import { Container, Form, Button, Table } from 'react-bootstrap';
    import './App.css';

    function App() {
      const [wallets, setWallets] = useState([]);
      const [address, setAddress] = useState('');
      const [comment, setComment] = useState('');

      const handleAddWallet = (e) => {
        e.preventDefault();
        setWallets([...wallets, { address, comment }]);
        setAddress('');
        setComment('');
      };

      const handleRemoveWallet = (index) => {
        const newWallets = wallets.filter((_, i) => i !== index);
        setWallets(newWallets);
      };

      return (
        <div className="app-background">
          <Container className="app-container">
            <div className="app-header">
              <h1 className="app-title">
                <span className="gradient-text">Only</span>
                <span className="purple-text">100x</span>
              </h1>
              <div className="tagline">Track. Analyze. Multiply.</div>
            </div>
            
            <Form onSubmit={handleAddWallet} className="app-form">
              <Form.Group className="mb-3">
                <Form.Label className="form-label">Wallet Address</Form.Label>
                <Form.Control
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  className="form-input"
                  placeholder="Enter Solana wallet address"
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="form-label">Comment (Optional)</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="form-input"
                  placeholder="Add a note about this wallet"
                />
              </Form.Group>

              <Button type="submit" className="primary-button">
                Add Wallet
              </Button>
            </Form>

            <div className="table-container">
              <Table borderless className="data-table">
                <thead>
                  <tr>
                    <th className="table-header">Wallet Address</th>
                    <th className="table-header">Comment</th>
                    <th className="table-header">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {wallets.map((wallet, index) => (
                    <tr key={index} className="table-row">
                      <td className="table-data">
                        <div className="wallet-address">
                          <span className="solana-icon">◎</span>
                          {wallet.address}
                        </div>
                      </td>
                      <td className="table-data">{wallet.comment}</td>
                      <td className="table-data">
                        <Button 
                          variant="link" 
                          onClick={() => handleRemoveWallet(index)}
                          className="remove-button"
                        >
                          Remove
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Container>
        </div>
      );
    }

    export default App;
