import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0x67fE46E3CF2766d2De4215F8bB6c7a6EA835DbAD'
);

export default instance;