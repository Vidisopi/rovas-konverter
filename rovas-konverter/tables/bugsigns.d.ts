export interface BugSignPair {
    lower: string;
    upper: string;
}

export interface BugSignForwardRule {
    latin: string;
    lower: string;
    upper: string;
}

export declare const BUG_SIGNS: {
    amb: BugSignPair;
    enc: BugSignPair;
    and: BugSignPair;
    unk: BugSignPair;
    emp: BugSignPair;
    ent: BugSignPair;
    entShaped: BugSignPair;
    us: BugSignPair;
};

export declare function normalizeBugSignConfig<T extends object>(config?: T): T & {
    homorganicMode: 'off' | 'traditional' | 'cluster';
    entVowel: 'e' | 'a' | 'i';
    empReading: 'emp' | 'omp';
    entShapedReading: 'preserve' | 'tprus' | 'temperius';
    useUsSign: boolean;
};

export declare function activeForwardBugSigns(config: {
    homorganicMode: 'off' | 'traditional' | 'cluster';
    entVowel: 'e' | 'a' | 'i';
    empReading: 'emp' | 'omp';
    entShapedReading: 'preserve' | 'tprus' | 'temperius';
    useUsSign: boolean;
}): BugSignForwardRule[];

export declare function bugSignReverseMap(config: {
    homorganicMode: 'off' | 'traditional' | 'cluster';
    entVowel: 'e' | 'a' | 'i';
    empReading: 'emp' | 'omp';
    entShapedReading: 'preserve' | 'tprus' | 'temperius';
    useUsSign: boolean;
}): Map<string, string>;
