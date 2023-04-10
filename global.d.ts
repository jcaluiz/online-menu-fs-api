import { SinonSandbox, SinonStubbedInstance } from 'sinon';
import { ChaiStatic } from 'chai';
import { Model } from 'mongoose';

declare global {
  namespace NodeJS {
    interface Global {
      expect: ChaiStatic['expect'];
      sinon: SinonSandbox;
      createStubInstance: SinonStubbedInstance<Model<any>>;
    }
  }
}
