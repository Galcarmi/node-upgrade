cmd_Release/obj.target/secp256k1/native/secp256k1/src/secp256k1.o := cc -o Release/obj.target/secp256k1/native/secp256k1/src/secp256k1.o ../native/secp256k1/src/secp256k1.c '-DNODE_GYP_MODULE_NAME=secp256k1' '-DUSING_UV_SHARED=1' '-DUSING_V8_SHARED=1' '-DV8_DEPRECATION_WARNINGS=1' '-DV8_DEPRECATION_WARNINGS' '-DV8_IMMINENT_DEPRECATION_WARNINGS' '-D_GLIBCXX_USE_CXX11_ABI=1' '-D_LARGEFILE_SOURCE' '-D_FILE_OFFSET_BITS=64' '-D__STDC_FORMAT_MACROS' '-DOPENSSL_NO_PINSHARED' '-DOPENSSL_THREADS' '-DECMULT_GEN_PREC_BITS=4' '-DECMULT_WINDOW_SIZE=15' '-DUSE_NUM_NONE=1' '-DUSE_FIELD_INV_BUILTIN=1' '-DUSE_SCALAR_INV_BUILTIN=1' '-DHAVE___INT128=1' '-DUSE_ASM_X86_64=1' '-DUSE_FIELD_5X52=1' '-DUSE_FIELD_5X52_INT128=1' '-DUSE_SCALAR_4X64=1' '-DBUILDING_NODE_EXTENSION' -I/root/.cache/node-gyp/18.17.1/include/node -I/root/.cache/node-gyp/18.17.1/src -I/root/.cache/node-gyp/18.17.1/deps/openssl/config -I/root/.cache/node-gyp/18.17.1/deps/openssl/openssl/include -I/root/.cache/node-gyp/18.17.1/deps/uv/include -I/root/.cache/node-gyp/18.17.1/deps/zlib -I/root/.cache/node-gyp/18.17.1/deps/v8/include -I/usr/local/include -I../native/secp256k1 -I../native/secp256k1/contrib -I../native/secp256k1/include -I../native/secp256k1/src -I../../nan  -fPIC -pthread -Wall -Wextra -Wno-unused-parameter -m64 -Wall -Wno-maybe-uninitialized -Wno-uninitialized -Wno-unused-function -Wextra -O3 -fno-omit-frame-pointer  -MMD -MF ./Release/.deps/Release/obj.target/secp256k1/native/secp256k1/src/secp256k1.o.d.raw   -c
Release/obj.target/secp256k1/native/secp256k1/src/secp256k1.o: \
 ../native/secp256k1/src/secp256k1.c \
 ../native/secp256k1/include/secp256k1.h \
 ../native/secp256k1/include/secp256k1_preallocated.h \
 ../native/secp256k1/include/secp256k1.h \
 ../native/secp256k1/src/assumptions.h ../native/secp256k1/src/util.h \
 ../native/secp256k1/src/num_impl.h ../native/secp256k1/src/num.h \
 ../native/secp256k1/src/field_impl.h \
 ../native/secp256k1/src/field_5x52_impl.h \
 ../native/secp256k1/src/field.h ../native/secp256k1/src/field_5x52.h \
 ../native/secp256k1/src/field_5x52_asm_impl.h \
 ../native/secp256k1/src/scalar_impl.h ../native/secp256k1/src/scalar.h \
 ../native/secp256k1/src/scalar_4x64.h \
 ../native/secp256k1/src/scalar_4x64_impl.h \
 ../native/secp256k1/src/group_impl.h ../native/secp256k1/src/group.h \
 ../native/secp256k1/src/ecmult_impl.h ../native/secp256k1/src/ecmult.h \
 ../native/secp256k1/src/scratch.h \
 ../native/secp256k1/src/ecmult_const_impl.h \
 ../native/secp256k1/src/ecmult_const.h \
 ../native/secp256k1/src/ecmult_gen_impl.h \
 ../native/secp256k1/src/ecmult_gen.h ../native/secp256k1/src/hash_impl.h \
 ../native/secp256k1/src/hash.h ../native/secp256k1/src/ecdsa_impl.h \
 ../native/secp256k1/src/ecdsa.h ../native/secp256k1/src/eckey_impl.h \
 ../native/secp256k1/src/eckey.h ../native/secp256k1/src/scratch_impl.h \
 ../native/secp256k1/src/selftest.h
../native/secp256k1/src/secp256k1.c:
../native/secp256k1/include/secp256k1.h:
../native/secp256k1/include/secp256k1_preallocated.h:
../native/secp256k1/include/secp256k1.h:
../native/secp256k1/src/assumptions.h:
../native/secp256k1/src/util.h:
../native/secp256k1/src/num_impl.h:
../native/secp256k1/src/num.h:
../native/secp256k1/src/field_impl.h:
../native/secp256k1/src/field_5x52_impl.h:
../native/secp256k1/src/field.h:
../native/secp256k1/src/field_5x52.h:
../native/secp256k1/src/field_5x52_asm_impl.h:
../native/secp256k1/src/scalar_impl.h:
../native/secp256k1/src/scalar.h:
../native/secp256k1/src/scalar_4x64.h:
../native/secp256k1/src/scalar_4x64_impl.h:
../native/secp256k1/src/group_impl.h:
../native/secp256k1/src/group.h:
../native/secp256k1/src/ecmult_impl.h:
../native/secp256k1/src/ecmult.h:
../native/secp256k1/src/scratch.h:
../native/secp256k1/src/ecmult_const_impl.h:
../native/secp256k1/src/ecmult_const.h:
../native/secp256k1/src/ecmult_gen_impl.h:
../native/secp256k1/src/ecmult_gen.h:
../native/secp256k1/src/hash_impl.h:
../native/secp256k1/src/hash.h:
../native/secp256k1/src/ecdsa_impl.h:
../native/secp256k1/src/ecdsa.h:
../native/secp256k1/src/eckey_impl.h:
../native/secp256k1/src/eckey.h:
../native/secp256k1/src/scratch_impl.h:
../native/secp256k1/src/selftest.h:
