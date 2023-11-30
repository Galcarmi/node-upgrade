# This file is generated by gyp; do not edit.

TOOLSET := target
TARGET := secp256k1
DEFS_Debug := \
	'-DNODE_GYP_MODULE_NAME=secp256k1' \
	'-DUSING_UV_SHARED=1' \
	'-DUSING_V8_SHARED=1' \
	'-DV8_DEPRECATION_WARNINGS=1' \
	'-DV8_DEPRECATION_WARNINGS' \
	'-DV8_IMMINENT_DEPRECATION_WARNINGS' \
	'-D_GLIBCXX_USE_CXX11_ABI=1' \
	'-D_LARGEFILE_SOURCE' \
	'-D_FILE_OFFSET_BITS=64' \
	'-D__STDC_FORMAT_MACROS' \
	'-DOPENSSL_NO_PINSHARED' \
	'-DOPENSSL_THREADS' \
	'-DENABLE_MODULE_ECDH=1' \
	'-DENABLE_MODULE_RECOVERY=1' \
	'-DUSE_NUM_NONE=1' \
	'-DUSE_FIELD_INV_BUILTIN=1' \
	'-DUSE_SCALAR_INV_BUILTIN=1' \
	'-DHAVE___INT128=1' \
	'-DUSE_ASM_X86_64=1' \
	'-DUSE_FIELD_5X52=1' \
	'-DUSE_FIELD_5X52_INT128=1' \
	'-DUSE_SCALAR_4X64=1' \
	'-DBUILDING_NODE_EXTENSION' \
	'-DDEBUG' \
	'-D_DEBUG' \
	'-DV8_ENABLE_CHECKS'

# Flags passed to all source files.
CFLAGS_Debug := \
	-fPIC \
	-pthread \
	-Wall \
	-Wextra \
	-Wno-unused-parameter \
	-m64 \
	-Wall \
	-Wno-maybe-uninitialized \
	-Wno-nonnull-compare \
	-Wno-uninitialized \
	-Wno-unused-function \
	-Wextra \
	-g \
	-O0

# Flags passed to only C files.
CFLAGS_C_Debug :=

# Flags passed to only C++ files.
CFLAGS_CC_Debug := \
	-std=c++0x \
	-fno-rtti \
	-fno-exceptions \
	-std=gnu++17

INCS_Debug := \
	-I/root/.cache/node-gyp/18.17.1/include/node \
	-I/root/.cache/node-gyp/18.17.1/src \
	-I/root/.cache/node-gyp/18.17.1/deps/openssl/config \
	-I/root/.cache/node-gyp/18.17.1/deps/openssl/openssl/include \
	-I/root/.cache/node-gyp/18.17.1/deps/uv/include \
	-I/root/.cache/node-gyp/18.17.1/deps/zlib \
	-I/root/.cache/node-gyp/18.17.1/deps/v8/include \
	-I$(srcdir)/src/secp256k1-src \
	-I$(srcdir)/src/secp256k1-src/contrib \
	-I$(srcdir)/src/secp256k1-src/include \
	-I$(srcdir)/src/secp256k1-src/src \
	-I$(srcdir)/../nan \
	-I/usr/local/include

DEFS_Release := \
	'-DNODE_GYP_MODULE_NAME=secp256k1' \
	'-DUSING_UV_SHARED=1' \
	'-DUSING_V8_SHARED=1' \
	'-DV8_DEPRECATION_WARNINGS=1' \
	'-DV8_DEPRECATION_WARNINGS' \
	'-DV8_IMMINENT_DEPRECATION_WARNINGS' \
	'-D_GLIBCXX_USE_CXX11_ABI=1' \
	'-D_LARGEFILE_SOURCE' \
	'-D_FILE_OFFSET_BITS=64' \
	'-D__STDC_FORMAT_MACROS' \
	'-DOPENSSL_NO_PINSHARED' \
	'-DOPENSSL_THREADS' \
	'-DENABLE_MODULE_ECDH=1' \
	'-DENABLE_MODULE_RECOVERY=1' \
	'-DUSE_NUM_NONE=1' \
	'-DUSE_FIELD_INV_BUILTIN=1' \
	'-DUSE_SCALAR_INV_BUILTIN=1' \
	'-DHAVE___INT128=1' \
	'-DUSE_ASM_X86_64=1' \
	'-DUSE_FIELD_5X52=1' \
	'-DUSE_FIELD_5X52_INT128=1' \
	'-DUSE_SCALAR_4X64=1' \
	'-DBUILDING_NODE_EXTENSION'

# Flags passed to all source files.
CFLAGS_Release := \
	-fPIC \
	-pthread \
	-Wall \
	-Wextra \
	-Wno-unused-parameter \
	-m64 \
	-Wall \
	-Wno-maybe-uninitialized \
	-Wno-nonnull-compare \
	-Wno-uninitialized \
	-Wno-unused-function \
	-Wextra \
	-O3 \
	-fno-omit-frame-pointer

# Flags passed to only C files.
CFLAGS_C_Release :=

# Flags passed to only C++ files.
CFLAGS_CC_Release := \
	-std=c++0x \
	-fno-rtti \
	-fno-exceptions \
	-std=gnu++17

INCS_Release := \
	-I/root/.cache/node-gyp/18.17.1/include/node \
	-I/root/.cache/node-gyp/18.17.1/src \
	-I/root/.cache/node-gyp/18.17.1/deps/openssl/config \
	-I/root/.cache/node-gyp/18.17.1/deps/openssl/openssl/include \
	-I/root/.cache/node-gyp/18.17.1/deps/uv/include \
	-I/root/.cache/node-gyp/18.17.1/deps/zlib \
	-I/root/.cache/node-gyp/18.17.1/deps/v8/include \
	-I$(srcdir)/src/secp256k1-src \
	-I$(srcdir)/src/secp256k1-src/contrib \
	-I$(srcdir)/src/secp256k1-src/include \
	-I$(srcdir)/src/secp256k1-src/src \
	-I$(srcdir)/../nan \
	-I/usr/local/include

OBJS := \
	$(obj).target/$(TARGET)/src/addon.o \
	$(obj).target/$(TARGET)/src/privatekey.o \
	$(obj).target/$(TARGET)/src/publickey.o \
	$(obj).target/$(TARGET)/src/signature.o \
	$(obj).target/$(TARGET)/src/ecdsa.o \
	$(obj).target/$(TARGET)/src/ecdh.o \
	$(obj).target/$(TARGET)/src/secp256k1-src/src/secp256k1.o \
	$(obj).target/$(TARGET)/src/secp256k1-src/contrib/lax_der_parsing.o \
	$(obj).target/$(TARGET)/src/secp256k1-src/contrib/lax_der_privatekey_parsing.o

# Add to the list of files we specially track dependencies for.
all_deps += $(OBJS)

# CFLAGS et al overrides must be target-local.
# See "Target-specific Variable Values" in the GNU Make manual.
$(OBJS): TOOLSET := $(TOOLSET)
$(OBJS): GYP_CFLAGS := $(DEFS_$(BUILDTYPE)) $(INCS_$(BUILDTYPE))  $(CFLAGS_$(BUILDTYPE)) $(CFLAGS_C_$(BUILDTYPE))
$(OBJS): GYP_CXXFLAGS := $(DEFS_$(BUILDTYPE)) $(INCS_$(BUILDTYPE))  $(CFLAGS_$(BUILDTYPE)) $(CFLAGS_CC_$(BUILDTYPE))

# Suffix rules, putting all outputs into $(obj).

$(obj).$(TOOLSET)/$(TARGET)/%.o: $(srcdir)/%.cc FORCE_DO_CMD
	@$(call do_cmd,cxx,1)

$(obj).$(TOOLSET)/$(TARGET)/%.o: $(srcdir)/%.c FORCE_DO_CMD
	@$(call do_cmd,cc,1)

# Try building from generated source, too.

$(obj).$(TOOLSET)/$(TARGET)/%.o: $(obj).$(TOOLSET)/%.cc FORCE_DO_CMD
	@$(call do_cmd,cxx,1)

$(obj).$(TOOLSET)/$(TARGET)/%.o: $(obj).$(TOOLSET)/%.c FORCE_DO_CMD
	@$(call do_cmd,cc,1)

$(obj).$(TOOLSET)/$(TARGET)/%.o: $(obj)/%.cc FORCE_DO_CMD
	@$(call do_cmd,cxx,1)

$(obj).$(TOOLSET)/$(TARGET)/%.o: $(obj)/%.c FORCE_DO_CMD
	@$(call do_cmd,cc,1)

# End of this set of suffix rules
### Rules for final target.
LDFLAGS_Debug := \
	-pthread \
	-rdynamic \
	-m64

LDFLAGS_Release := \
	-pthread \
	-rdynamic \
	-m64

LIBS :=

$(obj).target/secp256k1.node: GYP_LDFLAGS := $(LDFLAGS_$(BUILDTYPE))
$(obj).target/secp256k1.node: LIBS := $(LIBS)
$(obj).target/secp256k1.node: TOOLSET := $(TOOLSET)
$(obj).target/secp256k1.node: $(OBJS) FORCE_DO_CMD
	$(call do_cmd,solink_module)

all_deps += $(obj).target/secp256k1.node
# Add target alias
.PHONY: secp256k1
secp256k1: $(builddir)/secp256k1.node

# Copy this to the executable output path.
$(builddir)/secp256k1.node: TOOLSET := $(TOOLSET)
$(builddir)/secp256k1.node: $(obj).target/secp256k1.node FORCE_DO_CMD
	$(call do_cmd,copy)

all_deps += $(builddir)/secp256k1.node
# Short alias for building this executable.
.PHONY: secp256k1.node
secp256k1.node: $(obj).target/secp256k1.node $(builddir)/secp256k1.node

# Add executable to "all" target.
.PHONY: all
all: $(builddir)/secp256k1.node

