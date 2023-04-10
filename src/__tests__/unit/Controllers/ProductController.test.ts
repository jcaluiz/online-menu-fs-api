import request from 'supertest';
import App from '../../../api/app';

describe('ProductRouter', () => {
    const app = new App().app;
    
    it("should give an error if you don't have a token /POST /product", async () => {
      const response = await request(app)
        .post('/product')
        .send({
          categories: [
            {
                name: "Pratos Principais"
            }
          ],
          name: "Risoto de Frango",
          qty: 20,
          price: 5,
        });
        
      expect(response.status).toBe(401);
      expect(JSON.parse(response.text)).toHaveProperty('message', 'Token not found');
    });

    it('should register a product /POST /product', async () => {
        const login = await request(app)
          .post('/auth/login')
          .send({
            email: "adm@email.com",
            password: "@Luiz2912"
          });
        const {token} = JSON.parse(login.text);
        const response = await request(app)
          .post('/product')
          .set('Authorization', token)
          .send({
            categories: [
              {
                  name: "Pratos Principais"
              }
            ],
            name: "Risoto de Frango",
            qty: 20,
            price: 5,
          });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('name', 'Risoto de Frango');
        expect(response.body).toHaveProperty('price', 5);
        expect(response.body).toHaveProperty('categories', [
            {
              name: 'Pratos Principais',
              parent: { parent: null, name: 'Almoço' },
              id: response.body.categories[0].id,
            }
          ]);
      });
  });