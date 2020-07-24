import { Api, IApi, ICompiler, ICompilationResult, IResultLine } from "compilerexplorer-api";

class CppChainSmoker {
    private ce: IApi;
    private succeeded: Array<ICompilationResult> = [];
    private failed: Array<ICompilationResult> = [];
    private sourcecode: string;

    constructor() {
        this.ce = new Api({
            url: "https://compiler-explorer.com",
            defaultLanguage: "c++"
        });

        this.sourcecode =
`
    #include <iostream>
    int main(void) {
        std::cout << "hello world\\n";
        return 123;
    }
`;
    }

    async compile() {
        const compilers = await this.ce.compilers.list();
        for (const compiler of compilers) {
            if (compiler.supportsExecution() && (compiler.name.includes("x86") || compiler.name.includes("ellcc"))) {
                const result = await compiler.execute(this.sourcecode);
                if (result.code === 123 && result.stdout[0] && result.stdout[0].text === "hello world") {
                    this.succeeded.push(result);
                } else {
                    console.log(`FAIL ${compiler.id} (${compiler.name})`);
                    this.failed.push(result);
                }
            }
        }

        return this.failed.length;
    }
};

class PascalChainSmoker {
    private ce: IApi;
    private succeeded: Array<ICompilationResult> = [];
    private failed: Array<ICompilationResult> = [];
    private sourcecode: string;

    constructor() {
        this.ce = new Api({
            url: "https://compiler-explorer.com",
            defaultLanguage: "pascal"
        });

        this.sourcecode =
`
unit output;
interface
implementation
initialization
  writeln('hello world');
  System.ExitCode := 123;
end.
`;
    }

    async compile() {
        const compilers = await this.ce.compilers.list();
        for (const compiler of compilers) {
            if (compiler.supportsExecution()) {
                const result = await compiler.execute(this.sourcecode);
                if (result.code === 123 && result.stdout[0] && result.stdout[0].text === "hello world") {
                    this.succeeded.push(result);
                } else {
                    console.log(`FAIL ${compiler.id} (${compiler.name})`);
                    this.failed.push(result);
                }
            }
        }

        return this.failed.length;
    }
};

class FortranChainSmoker {
    private ce: IApi;
    private succeeded: Array<ICompilationResult> = [];
    private failed: Array<ICompilationResult> = [];
    private sourcecode: string;

    constructor() {
        this.ce = new Api({
            url: "https://compiler-explorer.com",
            defaultLanguage: "fortran"
        });

        this.sourcecode =
`
program hello
      print *,"hello world"
      call exit(123)
end program hello
`;
    }

    async compile() {
        const compilers = await this.ce.compilers.list();
        for (const compiler of compilers) {
            if (compiler.supportsExecution() && (compiler.id !== "flangtrunk")) {
                const result = await compiler.execute(this.sourcecode);
                // note: the extra space in the stdout is a bug -> https://github.com/compiler-explorer/compiler-explorer/issues/2100
                if (result.code === 123 && result.stdout[0] && result.stdout[0].text === " hello world") {
                    this.succeeded.push(result);
                } else {
                    console.log(`FAIL ${compiler.id} (${compiler.name})`);
                    this.failed.push(result);
                }
            }
        }

        return this.failed.length;
    }
};

class DChainSmoker {
    private ce: IApi;
    private succeeded: Array<ICompilationResult> = [];
    private failed: Array<ICompilationResult> = [];
    private sourcecode: string;

    constructor() {
        this.ce = new Api({
            url: "https://compiler-explorer.com",
            defaultLanguage: "d"
        });

        this.sourcecode =
`
import std.stdio;
int main() {
    writeln("hello world");
    return 123;
}
`;
    }

    async compile() {
        const compilers = await this.ce.compilers.list();
        for (const compiler of compilers) {
            if (compiler.supportsExecution()) {
                const result = await compiler.execute(this.sourcecode);
                if (result.code === 123 && result.stdout[0] && result.stdout[0].text === "hello world") {
                    this.succeeded.push(result);
                } else {
                    console.log(`FAIL ${compiler.id} (${compiler.name})`);
                    this.failed.push(result);
                }
            }
        }

        return this.failed.length;
    }
};

class GoChainSmoker {
    private ce: IApi;
    private succeeded: Array<ICompilationResult> = [];
    private failed: Array<ICompilationResult> = [];
    private sourcecode: string;

    constructor() {
        this.ce = new Api({
            url: "https://compiler-explorer.com",
            defaultLanguage: "go"
        });

        this.sourcecode =
`
package main
import "fmt"
import "os"
func main() {
    fmt.Println("hello world")
    os.Exit(123)
}
`;
    }

    async compile() {
        const compilers = await this.ce.compilers.list();
        for (const compiler of compilers) {
            if (compiler.supportsExecution()) {
                const result = await compiler.execute(this.sourcecode);
                if (result.code === 123 && result.stdout[0] && result.stdout[0].text === "hello world") {
                    this.succeeded.push(result);
                } else {
                    console.log(`FAIL ${compiler.id} (${compiler.name})`);
                    this.failed.push(result);
                }
            }
        }

        return this.failed.length;
    }
};

const smoker = new GoChainSmoker();
smoker.compile().then((result) => {
    console.log(result);
});
