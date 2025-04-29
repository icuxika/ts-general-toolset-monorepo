interface VectorStoreItem {
    embedding: number[];
    document: string;
}

class VectorStore {
    private items: VectorStoreItem[];

    constructor() {
        this.items = [];
    }

    async addEmbedding(embedding: number[], document: string) {
        this.items.push({ embedding, document });
    }

    async search(queryEmbedding: number[], topK: number = 3) {
        const scored = this.items.map((item) => {
            return {
                document: item.document,
                score: this.cosineSimilarity(queryEmbedding, item.embedding),
            };
        });
        const topKDocuments = scored
            .sort((a, b) => b.score - a.score)
            .slice(0, topK)
            .map((item) => item.document);
        return topKDocuments;
    }

    private cosineSimilarity(vecA: number[], vecB: number[]) {
        const dotProduct = vecA.reduce((acc, val, i) => acc + val * vecB[i], 0);
        const normA = Math.sqrt(vecA.reduce((acc, val) => acc + val * val, 0));
        const normB = Math.sqrt(vecB.reduce((acc, val) => acc + val * val, 0));
        return dotProduct / (normA * normB);
    }
}

export { VectorStore };
