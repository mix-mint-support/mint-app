"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KIP37Holder__factory = void 0;
const contracts_1 = require("@ethersproject/contracts");
class KIP37Holder__factory extends contracts_1.ContractFactory {
    constructor(signer) {
        super(_abi, _bytecode, signer);
    }
    deploy(overrides) {
        return super.deploy(overrides || {});
    }
    getDeployTransaction(overrides) {
        return super.getDeployTransaction(overrides || {});
    }
    attach(address) {
        return super.attach(address);
    }
    connect(signer) {
        return super.connect(signer);
    }
    static connect(address, signerOrProvider) {
        return new contracts_1.Contract(address, _abi, signerOrProvider);
    }
}
exports.KIP37Holder__factory = KIP37Holder__factory;
const _abi = [
    {
        constant: true,
        inputs: [
            {
                name: "interfaceId",
                type: "bytes4",
            },
        ],
        name: "supportsInterface",
        outputs: [
            {
                name: "",
                type: "bool",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            {
                name: "",
                type: "address",
            },
            {
                name: "",
                type: "address",
            },
            {
                name: "",
                type: "uint256[]",
            },
            {
                name: "",
                type: "uint256[]",
            },
            {
                name: "",
                type: "bytes",
            },
        ],
        name: "onKIP37BatchReceived",
        outputs: [
            {
                name: "",
                type: "bytes4",
            },
        ],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            {
                name: "",
                type: "address",
            },
            {
                name: "",
                type: "address",
            },
            {
                name: "",
                type: "uint256",
            },
            {
                name: "",
                type: "uint256",
            },
            {
                name: "",
                type: "bytes",
            },
        ],
        name: "onKIP37Received",
        outputs: [
            {
                name: "",
                type: "bytes4",
            },
        ],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
];
const _bytecode = "0x608060405261001a6301ffc9a760e01b61007260201b60201c565b61006d600073ffffffffffffffffffffffffffffffffffffffff16639b49e332905060e01b600073ffffffffffffffffffffffffffffffffffffffff1663e78b3325905060e01b1861007260201b60201c565b61017a565b63ffffffff60e01b817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916141561010e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601b8152602001807f4b495031333a20696e76616c696420696e74657266616365206964000000000081525060200191505060405180910390fd5b6001600080837bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060006101000a81548160ff02191690831515021790555050565b61053e806101896000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c806301ffc9a7146100465780639b49e332146100ab578063e78b332514610320575b600080fd5b6100916004803603602081101561005c57600080fd5b8101908080357bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19169060200190929190505050610481565b604051808215151515815260200191505060405180910390f35b6102cc600480360360a08110156100c157600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019064010000000081111561011e57600080fd5b82018360208201111561013057600080fd5b8035906020019184602083028401116401000000008311171561015257600080fd5b919080806020026020016040519081016040528093929190818152602001838360200280828437600081840152601f19601f820116905080830192505050505050509192919290803590602001906401000000008111156101b257600080fd5b8201836020820111156101c457600080fd5b803590602001918460208302840111640100000000831117156101e657600080fd5b919080806020026020016040519081016040528093929190818152602001838360200280828437600081840152601f19601f8201169050808301925050505050505091929192908035906020019064010000000081111561024657600080fd5b82018360208201111561025857600080fd5b8035906020019184600183028401116401000000008311171561027a57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192905050506104e8565b60405180827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916815260200191505060405180910390f35b61042d600480360360a081101561033657600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019092919080359060200190929190803590602001906401000000008111156103a757600080fd5b8201836020820111156103b957600080fd5b803590602001918460018302840111640100000000831117156103db57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192905050506104fd565b60405180827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916815260200191505060405180910390f35b6000806000837bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060009054906101000a900460ff169050919050565b6000639b49e33260e01b905095945050505050565b600063e78b332560e01b90509594505050505056fea165627a7a7230582023088dd072756383f28795007bfa047550411562756d2c2eea119c81247a6ac80029";
//# sourceMappingURL=KIP37Holder__factory.js.map