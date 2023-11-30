# This file is generated by gyp; do not edit.

TOOLSET := target
TARGET := gpr
DEFS_Debug := \
	'-DPB_FIELD_32BIT' \
	'-DGPR_BACKWARDS_COMPATIBILITY_MODE' \
	'-DGRPC_ARES=1' \
	'-DGRPC_UV' \
	'-DGRPC_NODE_VERSION="1.24.2"' \
	'-DCARES_STATICLIB' \
	'-DCARES_SYMBOL_HIDING' \
	'-DNODE_GYP_MODULE_NAME=gpr' \
	'-DUSING_UV_SHARED=1' \
	'-DUSING_V8_SHARED=1' \
	'-DV8_DEPRECATION_WARNINGS=1' \
	'-DV8_DEPRECATION_WARNINGS' \
	'-DV8_IMMINENT_DEPRECATION_WARNINGS' \
	'-D_GLIBCXX_USE_CXX11_ABI=1' \
	'-DTSI_OPENSSL_ALPN_SUPPORT=1' \
	'-D_LARGEFILE_SOURCE' \
	'-D_FILE_OFFSET_BITS=64' \
	'-D__STDC_FORMAT_MACROS' \
	'-DOPENSSL_NO_PINSHARED' \
	'-D_DEBUG' \
	'-DDEBUG' \
	'-DV8_ENABLE_CHECKS'

# Flags passed to all source files.
CFLAGS_Debug := \
	-g \
	-Wall \
	-Wextra \
	-DOSATOMIC_USE_INLINED=1 \
	-Ithird_party/upb \
	-Isrc/core/ext/upb-generated \
	-fvisibility=hidden \
	-fPIC \
	-pthread \
	-Wall \
	-Wextra \
	-Wno-unused-parameter \
	-m64 \
	-O0 \
	-g \
	-O0

# Flags passed to only C files.
CFLAGS_C_Debug := \
	-std=c99

# Flags passed to only C++ files.
CFLAGS_CC_Debug := \
	-std=c++1y \
	-fno-rtti \
	-fno-exceptions \
	-std=gnu++17

INCS_Debug := \
	-I$(srcdir)/deps/grpc \
	-I$(srcdir)/deps/grpc/include \
	-I$(srcdir)/deps/grpc/src/core/ext/upb-generated \
	-I$(srcdir)/deps/grpc/third_party/abseil-cpp \
	-I$(srcdir)/deps/grpc/third_party/address_sorting/include \
	-I$(srcdir)/deps/grpc/third_party/cares \
	-I$(srcdir)/deps/grpc/third_party/cares/cares \
	-I$(srcdir)/deps/grpc/third_party/nanopb \
	-I$(srcdir)/deps/grpc/third_party/upb \
	-I$(srcdir)/deps/grpc/third_party/upb/generated_for_cmake \
	-I/root/.cache/node-gyp/18.17.1/include/node \
	-I/root/.cache/node-gyp/18.17.1/src \
	-I/root/.cache/node-gyp/18.17.1/deps/openssl/config \
	-I/root/.cache/node-gyp/18.17.1/deps/openssl/openssl/include \
	-I/root/.cache/node-gyp/18.17.1/deps/uv/include \
	-I/root/.cache/node-gyp/18.17.1/deps/zlib \
	-I/root/.cache/node-gyp/18.17.1/deps/v8/include \
	-I/root/.cache/node-gyp/18.17.1/deps/openssl/openssl/include \
	-I/root/.cache/node-gyp/18.17.1/deps/openssl/config/k8 \
	-I/root/.cache/node-gyp/18.17.1/deps/zlib

DEFS_Release := \
	'-DPB_FIELD_32BIT' \
	'-DGPR_BACKWARDS_COMPATIBILITY_MODE' \
	'-DGRPC_ARES=1' \
	'-DGRPC_UV' \
	'-DGRPC_NODE_VERSION="1.24.2"' \
	'-DCARES_STATICLIB' \
	'-DCARES_SYMBOL_HIDING' \
	'-DNODE_GYP_MODULE_NAME=gpr' \
	'-DUSING_UV_SHARED=1' \
	'-DUSING_V8_SHARED=1' \
	'-DV8_DEPRECATION_WARNINGS=1' \
	'-DV8_DEPRECATION_WARNINGS' \
	'-DV8_IMMINENT_DEPRECATION_WARNINGS' \
	'-D_GLIBCXX_USE_CXX11_ABI=1' \
	'-DTSI_OPENSSL_ALPN_SUPPORT=1' \
	'-D_LARGEFILE_SOURCE' \
	'-D_FILE_OFFSET_BITS=64' \
	'-D__STDC_FORMAT_MACROS' \
	'-DOPENSSL_NO_PINSHARED' \
	'-DNDEBUG'

# Flags passed to all source files.
CFLAGS_Release := \
	-g \
	-Wall \
	-Wextra \
	-DOSATOMIC_USE_INLINED=1 \
	-Ithird_party/upb \
	-Isrc/core/ext/upb-generated \
	-fvisibility=hidden \
	-fPIC \
	-pthread \
	-Wall \
	-Wextra \
	-Wno-unused-parameter \
	-m64 \
	-O2 \
	-Wframe-larger-than=16384 \
	-O3 \
	-fno-omit-frame-pointer

# Flags passed to only C files.
CFLAGS_C_Release := \
	-std=c99

# Flags passed to only C++ files.
CFLAGS_CC_Release := \
	-std=c++1y \
	-fno-rtti \
	-fno-exceptions \
	-std=gnu++17

INCS_Release := \
	-I$(srcdir)/deps/grpc \
	-I$(srcdir)/deps/grpc/include \
	-I$(srcdir)/deps/grpc/src/core/ext/upb-generated \
	-I$(srcdir)/deps/grpc/third_party/abseil-cpp \
	-I$(srcdir)/deps/grpc/third_party/address_sorting/include \
	-I$(srcdir)/deps/grpc/third_party/cares \
	-I$(srcdir)/deps/grpc/third_party/cares/cares \
	-I$(srcdir)/deps/grpc/third_party/nanopb \
	-I$(srcdir)/deps/grpc/third_party/upb \
	-I$(srcdir)/deps/grpc/third_party/upb/generated_for_cmake \
	-I/root/.cache/node-gyp/18.17.1/include/node \
	-I/root/.cache/node-gyp/18.17.1/src \
	-I/root/.cache/node-gyp/18.17.1/deps/openssl/config \
	-I/root/.cache/node-gyp/18.17.1/deps/openssl/openssl/include \
	-I/root/.cache/node-gyp/18.17.1/deps/uv/include \
	-I/root/.cache/node-gyp/18.17.1/deps/zlib \
	-I/root/.cache/node-gyp/18.17.1/deps/v8/include \
	-I/root/.cache/node-gyp/18.17.1/deps/openssl/openssl/include \
	-I/root/.cache/node-gyp/18.17.1/deps/openssl/config/k8 \
	-I/root/.cache/node-gyp/18.17.1/deps/zlib

OBJS := \
	$(obj).target/$(TARGET)/deps/grpc/src/core/lib/gpr/alloc.o \
	$(obj).target/$(TARGET)/deps/grpc/src/core/lib/gpr/atm.o \
	$(obj).target/$(TARGET)/deps/grpc/src/core/lib/gpr/cpu_iphone.o \
	$(obj).target/$(TARGET)/deps/grpc/src/core/lib/gpr/cpu_linux.o \
	$(obj).target/$(TARGET)/deps/grpc/src/core/lib/gpr/cpu_posix.o \
	$(obj).target/$(TARGET)/deps/grpc/src/core/lib/gpr/cpu_windows.o \
	$(obj).target/$(TARGET)/deps/grpc/src/core/lib/gpr/env_linux.o \
	$(obj).target/$(TARGET)/deps/grpc/src/core/lib/gpr/env_posix.o \
	$(obj).target/$(TARGET)/deps/grpc/src/core/lib/gpr/env_windows.o \
	$(obj).target/$(TARGET)/deps/grpc/src/core/lib/gpr/log.o \
	$(obj).target/$(TARGET)/deps/grpc/src/core/lib/gpr/log_android.o \
	$(obj).target/$(TARGET)/deps/grpc/src/core/lib/gpr/log_linux.o \
	$(obj).target/$(TARGET)/deps/grpc/src/core/lib/gpr/log_posix.o \
	$(obj).target/$(TARGET)/deps/grpc/src/core/lib/gpr/log_windows.o \
	$(obj).target/$(TARGET)/deps/grpc/src/core/lib/gpr/mpscq.o \
	$(obj).target/$(TARGET)/deps/grpc/src/core/lib/gpr/murmur_hash.o \
	$(obj).target/$(TARGET)/deps/grpc/src/core/lib/gpr/string.o \
	$(obj).target/$(TARGET)/deps/grpc/src/core/lib/gpr/string_posix.o \
	$(obj).target/$(TARGET)/deps/grpc/src/core/lib/gpr/string_util_windows.o \
	$(obj).target/$(TARGET)/deps/grpc/src/core/lib/gpr/string_windows.o \
	$(obj).target/$(TARGET)/deps/grpc/src/core/lib/gpr/sync.o \
	$(obj).target/$(TARGET)/deps/grpc/src/core/lib/gpr/sync_posix.o \
	$(obj).target/$(TARGET)/deps/grpc/src/core/lib/gpr/sync_windows.o \
	$(obj).target/$(TARGET)/deps/grpc/src/core/lib/gpr/time.o \
	$(obj).target/$(TARGET)/deps/grpc/src/core/lib/gpr/time_posix.o \
	$(obj).target/$(TARGET)/deps/grpc/src/core/lib/gpr/time_precise.o \
	$(obj).target/$(TARGET)/deps/grpc/src/core/lib/gpr/time_windows.o \
	$(obj).target/$(TARGET)/deps/grpc/src/core/lib/gpr/tls_pthread.o \
	$(obj).target/$(TARGET)/deps/grpc/src/core/lib/gpr/tmpfile_msys.o \
	$(obj).target/$(TARGET)/deps/grpc/src/core/lib/gpr/tmpfile_posix.o \
	$(obj).target/$(TARGET)/deps/grpc/src/core/lib/gpr/tmpfile_windows.o \
	$(obj).target/$(TARGET)/deps/grpc/src/core/lib/gpr/wrap_memcpy.o \
	$(obj).target/$(TARGET)/deps/grpc/src/core/lib/gprpp/arena.o \
	$(obj).target/$(TARGET)/deps/grpc/src/core/lib/gprpp/fork.o \
	$(obj).target/$(TARGET)/deps/grpc/src/core/lib/gprpp/global_config_env.o \
	$(obj).target/$(TARGET)/deps/grpc/src/core/lib/gprpp/host_port.o \
	$(obj).target/$(TARGET)/deps/grpc/src/core/lib/gprpp/thd_posix.o \
	$(obj).target/$(TARGET)/deps/grpc/src/core/lib/gprpp/thd_windows.o \
	$(obj).target/$(TARGET)/deps/grpc/src/core/lib/profiling/basic_timers.o \
	$(obj).target/$(TARGET)/deps/grpc/src/core/lib/profiling/stap_timers.o

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

# Try building from generated source, too.

$(obj).$(TOOLSET)/$(TARGET)/%.o: $(obj).$(TOOLSET)/%.cc FORCE_DO_CMD
	@$(call do_cmd,cxx,1)

$(obj).$(TOOLSET)/$(TARGET)/%.o: $(obj)/%.cc FORCE_DO_CMD
	@$(call do_cmd,cxx,1)

# End of this set of suffix rules
### Rules for final target.
LDFLAGS_Debug := \
	-g \
	-pthread \
	-rdynamic \
	-m64

LDFLAGS_Release := \
	-g \
	-pthread \
	-rdynamic \
	-m64

LIBS :=

$(obj).target/libgpr.a: GYP_LDFLAGS := $(LDFLAGS_$(BUILDTYPE))
$(obj).target/libgpr.a: LIBS := $(LIBS)
$(obj).target/libgpr.a: TOOLSET := $(TOOLSET)
$(obj).target/libgpr.a: $(OBJS)
	$(call create_archive,$@,$^)

# Add target alias
.PHONY: gpr
gpr: $(obj).target/libgpr.a

# Add target alias to "all" target.
.PHONY: all
all: gpr

# Add target alias
.PHONY: gpr
gpr: $(builddir)/libgpr.a

# Copy this to the static library output path.
$(builddir)/libgpr.a: TOOLSET := $(TOOLSET)
$(builddir)/libgpr.a: $(obj).target/libgpr.a FORCE_DO_CMD
	$(call do_cmd,copy)

all_deps += $(builddir)/libgpr.a
# Short alias for building this static library.
.PHONY: libgpr.a
libgpr.a: $(obj).target/libgpr.a $(builddir)/libgpr.a

# Add static library to "all" target.
.PHONY: all
all: $(builddir)/libgpr.a

